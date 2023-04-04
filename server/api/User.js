const express = require('express');
const router = express.Router();

const User = require('./../models/User');
const UserVerification = require('./../models/UserVerification');
const nodemailer = require('nodemailer');
const {v4: uuidv4} = require("uuid");

require('dotenv').config();

//const cookieParser = require('cookie-parser');

//const session = require('express-session');

const bcrypt = require('bcrypt');
const path = require("path");


let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASS,
    },
});


transporter.verify((error, success) => {
    if(error) {
        console.log(error);
    } else {
        console.log("Ready for messages");
        console.log(success);
    }
});


const passwordPattern = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;


router.post('/signup', (req, res) => {
    const { user_first_name, user_last_name, user_phone_number, user_email, user_password, user_address, user_birthday } = req.body;

    if (!user_first_name || !user_last_name || !user_phone_number || !user_email ||!user_password || !user_address || !user_birthday) {
      return res.status(400).send('All fields are required');
    }

    if (!passwordPattern.test(user_password)) {
      return res.status(400).send('Password must be at least 8 characters and contain at least one number and one special character');
    }


    if (!emailPattern.test(user_email)) {
      return res.status(400).send('Invalid email format');
    }

    // Generate a salt to use for password hashing

    const saltRounds = 10;
    bcrypt.genSalt(saltRounds, (err, salt) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error generating salt');
        }

        // Hash the password using the generated salt

        bcrypt.hash(user_password, salt, (err, hash) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error hashing password');
            }

            // Create a new user with the hashed password

            const user = new User({
                user_first_name: user_first_name,
                user_last_name: user_last_name,
                user_phone_number: user_phone_number,
                user_email: user_email,
                user_password: hash,
                user_address: user_address,
                user_birthday: user_birthday,
                verified: false,
            });

            // Save the user to the database
            user
            .save()
            .then((result) => {
                // handle account verification
                sendVerificationEmail(result, res);
            })
            .catch((err) => {
                res.json({
                    status: "FAILED",
                    message: "An error occurred while hashing password!",
                })
            })
        });
    });
});



const sendVerificationEmail = ({_id, user_email}, res) => {
    const currentUrl = "http://localhost:5001/";

    const uniqueString = uuidv4() + _id;

    const mailOptions = {
        from: process.env.AUTH_EMAIL,
        to: user_email,
        subject: "Verify your email",
        html: `<p>Verify your email address to complete the signup and login into your account.</p><p> This link <b>expires in 6 hours</b>.</p><p>Press <a href=${currentUrl + "user/verify/" + _id + "/" + uniqueString}>here</a> to proceed.</p>`,
    };
    const saltRounds = 10;
    bcrypt
    .hash(uniqueString, saltRounds)
    .then((hashedUniqueString) => {
        const newVerification = new UserVerification({
            userId: _id,
            uniqueString: hashedUniqueString,
            createdAt: Date.now(),
            expiresAt: Date.now() + 21600000,

        });
        newVerification
        .save()
        .then(() => {
            transporter
            .sendMail(mailOptions)
            .then(() => {
                res.json({
                    status: "PENDING",
                    message: "Verification email sent",
                })
            })
            .catch((error) => {
                console.log(error);
                res.json({
                    status: "FAILED",
                    message: "Verification email failed",
                });
            })
        })
        .catch((error) => {
            console.log(error);
            res.json({
                status: "FAILED",
                message: "Couldn't save verification email data!",
            })
        })
    })
    .catch(() => {
        res.json({
            status: "FAILED",
            message: "An error occurred while hashing email data!"
        })
    });
};

router.get("/verify/:userId/:uniqueString", (req, res) => {
    let {userId, uniqueString} = req.params;
    const currentUrl = "http://localhost:3002";

    UserVerification
    .find({userId})
    .then((result) => {
        if (result.length > 0) {
            const {expiresAt} = result[0];
            const hashedUniqueString = result[0].uniqueString;

            if (expiresAt < Date.now()) {
                UserVerification
                .deleteOne({ userId })
                .then(result => {
                    User
                    .deleteOne({_id: userId})
                    .then(result => {
                        let message = "Link has expired. Please sign up again.";
                        res.redirect(currentUrl + `/verificationpage/error=true&messages=${message}`);
                    })
                    .catch((error) => {
                        let message = "Clearing user with expired unique string failed";
                        res.redirect(currentUrl + `/verificationpage/error=true&messages=${message}`);
                    })
                })
                .catch((error) => {
                    console.log(error);
                    let message = "An error occurred while clearing expired user verification record";
                    res.redirect(currentUrl + `/verificationpage/error=true&messages=${message}`);
                })
            } else {
                bcrypt
                .compare(uniqueString,hashedUniqueString)
                .then(result => {
                    if (result) {
                        User
                        .updateOne({_id: userId}, {verified: true})
                        .then(() => {
                            UserVerification
                            .deleteOne({userId})
                            .then(() => {
                                res.redirect(currentUrl + `/verificationpage`)
                            })
                            .catch(error => {
                                console.log(error);
                                let message = "An error occurred while finalizing successful verification.";
                                res.redirect(currentUrl + `/verificationpage/error=true&messages=${message}`);
                            })
                        })
                        .catch(error => {
                            console.log(error);
                            let message = "An error occurred while updating user record to show verified.";
                            res.redirect(currentUrl + `/verificationpage/error=true&messages=${message}`);
                        })
                    } else {
                        let message = "Invalid verification details passed. Check your inbox";
                        res.redirect(currentUrl + `/verificationpage/error=true&messages=${message}`);
                    }
                })
                .catch(error => {
                    let message = "An error occurred while compring unique strings";
                    res.redirect(currentUrl + `/verificationpage/error=true&messages=${message}`);
                })
            }
        } else {
            let message = "Account record doesn't exist or has been verified already. Please sign up or login.";
            res.redirect(currentUrl + `/verificationpage/error=true&messages=${message}`);
        }
    })
    .catch((error) => {
        console.log(error);
        let message = "An error occurred while checking for existing user verification record";
        res.redirect(currentUrl + `/verificationpage/error=true&messages=${message}`);
    });
});


router.get("/verified", (req, res) => {
    res.sendFile(path.join(__dirname, "./../views/verified.html"));
})


// logging in
router.post('/signin', (req, res) => {
    const { user_email, user_password } = req.body;

    if( !user_email || !user_password) {
        res.json({
            status: "FAILED",
            message: "Empyt credentials supplied"
        })
    } else {
        User.find({user_email})
        .then(data => {
            if (data.length) {
                if (!data[0].verified) {
                    res.json({
                        status: "FAILED",
                        message: "Email has not been verified yet, check your inbox",
                    })
                } else {
                    const hashedPassword = data[0].user_password;
                    bcrypt.compare(user_password, hashedPassword).then(result => {
                    if (result) {
                        req.session.user = data[0];
                        console.log(req.session.user)
                        //res.send(result)
                        res.json({
                            status: "SUCCESS",
                            message: "Successfully logged in",
                        })
                    } else {
                        res.json({
                            status: "FAILED",
                            message: "Invalid password entered"
                        })
                    }
                })
                .catch(err => {
                    res.json({
                        status: "FAILED",
                        message: "An error occurred while comparing passwords"
                    })
                })
                }

            } else {
                res.json({
                    status: "FAILED",
                    message: "Invalid credentials entered"
                })
            }
        }).catch(err => {
            res.json({
                status: "FAILED",
                message: "An error occured while checking for existing user"
            })
        })
    }
})

router.get("/userinfo", (req, res) => {
    console.log(req.session)
    const user = req.session.user;
    if(user) {
        res.json({
            status: "SUCCESS",
            fname: `${user.user_first_name}`,
            sname: `${user.user_last_name}`
        })
    } else {
        res.json({
            status: "FAILED",
            message: "ERROR",
        })
    }
});

router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        res.json({
          status: "FAILED",
          message: "Error occurred while logging out",
        })
      } else {
        res.clearCookie("userId");
        res.json({
          status: "SUCCESS",
          message: "Logged out successfully",
        })
      }
    });
  });


module.exports = router;