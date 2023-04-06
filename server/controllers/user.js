const User = require('../schema/UserSchema');

exports.create = async (req, res) => {
    const { user_first_name, user_last_name, user_phone_number, user_email, user_password, user_address, user_birthday, verified } = req.body;
    console.log('New user: ', req.body)

    try {
        // let newuser = new user({
        //     _id: _id,
        //     user_id: user_id,
        //     specialties: specialties,
        //     description: description,
        //     date_joined: date_joined,
        //     application_status: application_status
        // });

        let newUser = new User({
            user_first_name: user_first_name,
            user_last_name: user_last_name,
            user_phone_number: user_phone_number,
            user_email: user_email,
            user_password: user_password,
            user_address: user_address,
            user_birthday: user_birthday,
            verified: verified
      });

        await newUser.save();

        res.status(200).json({
            user: newUser,
            successMessage: `${newUser.user_name} was created :)`,
        });
    } catch (err) {
        console.log('User Create Error: ', err);
        res.status(500).json({
            errorMessage: 'Please try again later',
        });
    }
};


// exports.readAll = async (req, res) => {
//     // const { category_name, category_description } = req.body;
//     // console.log('!!!!!!!!!!!!!!!!!!', req.body)

//     try {

//         const categories = await Category.find({});

//         // console.log('Category: ', categories)
//         res.status(200).json({
//             categories,
//         })
//     } catch (err) {
//         console.log('Category ReadAll Error: ', err);
//         res.status(500).json({
//             errorMessage: 'Please try again later',
//         });
//     }
// };

exports.readAll = async (req, res) => {
    try {
      const users = await User.find({});
      res.status(200).json(users);
    } catch (err) {
      console.log('User ReadAll Error: ', err);
      res.status(500).json({
        errorMessage: 'Please try again later',
      });
    }
  };


  exports.delete = async (req, res) => {
    try {
      const userId = req.params.userId;
      const deleteUser = await User.findByIdAndDelete(userId);

      res.json(deleteUser);
    } catch (err) {
      console.log(err, 'userController.delete error');
      res.status(500).json({
        errorMessage: 'Please try again later',
      });
    }
  }

  exports.read = async (req, res) => {
    try {
      const userId = req.params.userId;
      const user = await User.findById(userId);

      res.json(user);
      console.log(user);
    } catch (err) {
      console.log('User Read Error: ', err);
      res.status(500).json({
        errorMessage: 'Please try again later',
      });
    }
  };


  exports.update = async (req, res) => {
    const userId = req.params.userId;
  
    const oldUser = await User.findByIdAndUpdate(userId, req.body);
  
    res.json({
      successMessage: 'User successfully updated',
    });
  };
