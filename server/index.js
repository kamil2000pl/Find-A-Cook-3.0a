const express = require('express');
const app = express();
// const stripe = require('stripe')('sk_test_51MYbfMDYuzoeBKxGcMhrNfA5j9wjsN4QqBDDofXq7ZXgfJhZB1K5R9MrUQZAEGVdzUgxgFcLyzSWIXLgbtUSD2Fz00NY3BBAUN');

// const connectDB = require('../database/db');
// const connectDB = require('../database/db');
const cors = require('cors');
const morgan = require('morgan');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const filterRoutes = require('./routes/filter');
// const subscriptionController = require('./routes/subscribe')
const mongoose = require('mongoose');

// app.use(cors());
app.use(express.json());
app.use('/api/category', categoryRoutes);
// app.use('/api/subscribe', subscriptionController);
app.use('/api/product', productRoutes);
app.use('/uploads', express.static('uploads'));
app.use('/api/filter', filterRoutes);


// app.post('/create_customer', async (request, response) => {
//     const customerEmailAddress = request.body.customerEmailId;
//     const customer = await stripe.customers.create({
//         description: `${customerEmailAddress} via API`,
//         email: customerEmailAddress
//     });
//     console.log(customer);
//     let theCreatedCustomerId = customer.id;
//     response.send({
//         customerId: theCreatedCustomerId
//     });
// });

// app.post('/create_checkout_link', async (request, response) => {
//     const priceId = request.body.priceId;
//     const customerId = request.body.customerId;
//     const session = await stripe.checkout.sessions.create({
//         billing_address_collection: 'auto',
//         line_items: [
//             {
//                 price: priceId,
//                 quantity: 1,
//             },
//         ],
//         mode: 'subscription',
//         success_url: `http://localhost:3000/paymentsuccessful/?success=true`,
//         cancel_url: `http://localhost:3000/paymentunsuccessful/?canceled=true`,
//         customer: customerId
//     });
//     console.log(session);
//     response.send({
//         url: session.url
//     });
// });

// app.post('/create-subscription', ( req  ,res ) => {

//     createSubscription(req);
//     // console.log(createSubscription)

// })

// async function createSubscription(createSubscriptionRequest) {
  
//     // create a stripe customer
//     const customer = await stripe.customers.create({
//       name: createSubscriptionRequest.name,
//       email: createSubscriptionRequest.email,
//       payment_method: createSubscriptionRequest.paymentMethod,
//       invoice_settings: {
//         default_payment_method: createSubscriptionRequest.paymentMethod,
//       },
//     });


//     // get the price id from the front-end
//     const priceId = createSubscriptionRequest.priceId;

//     // create a stripe subscription
//     const subscription = await stripe.subscriptions.create({
//       customer: customer.id,
//       items: [{ price: priceId }],
//       payment_settings: {
//         payment_method_options: {
//           card: {
//             request_three_d_secure: 'any',
//           },
//         },
//         payment_method_types: ['card'],
//         save_default_payment_method: 'on_subscription',
//       },
//       expand: ['latest_invoice.payment_intent'],
//     });

//     // return the client secret and subscription id
//     return {
//       clientSecret: subscription.latest_invoice.payment_intent.client_secret,
//       subscriptionId: subscription.id,
//     };
//   }


// connectDB();

mongoose.set('strictQuery', false);

const connectDB = async () => {
    try{
        await mongoose.connect(
            'mongodb+srv://Team7:oXVVWGS8BCRZB2FM@findacook.dr9enwh.mongodb.net/?retryWrites=true&w=majority',
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        );

        console.log('Database Connection Success');
    } catch (err) {
        console.log(err);
    }
};

connectDB();

const port = process.env.PORT || 10000;

app.listen(port, () => console.log(`Listening on port ${port}`));
// const mysql = require("mysql");
// const cors = require("cors");

// const bodyParser = require('body-parser')
// const cookieParser = require('cookie-parser')
// const session = require('express-session')

// const bcrypt = require('bcrypt')
// const saltRounds = 10

// app.use(express.json());
// app.use(cors({
//   origin: ["http://localhost:3000"],
//   methods: ["GET", "POST"],
//   credentials: true
// }));
// app.use(cookieParser())
// app.use(bodyParser.urlencoded({extended: true}));

// app.use(session({
//   key: "userId",
//   secret: "subscribe_to_findacook",
//   resave: false,
//   saveUninitialized: "false",
//   cookie: {
//     expires: 60 * 60 * 24,
//   }
// }))

// const db = mysql.createConnection({
//   user: "root",
//   host: "localhost",
//   password: "12345678",
//   database: "test_db",
// });


// app.post('/register', (req, res)=> {
//   const name = req.body.name
//   const email = req.body.email
//   const password = req.body.password


//   bcrypt.hash(password, saltRounds, (err, hash) => {

//     if (err) {
//       console.log(err)
//     }


//     db.query("INSERT INTO users (name, email, password) VALUES (?,?,?)", [name, email, hash], (err, result)=> {
//       console.log(err);
//     });
//   })
// });

// app.get("/login", (req, res)=> {
//   if (req.session.user) {
//     res.send({loggedIn: true, user: req.session.user});
//   } else {
//     res.send({ loggedIn: false});
//   }
// });

// app.get("/logout", (req, res) => {
//   req.session.destroy();
//   res.clearCookie("userId");
//   res.send({ message: "Successfully logged out" });
// });

// app.post('/login', (req, res) => {
//   const email = req.body.email
//   const password = req.body.password

//   db.query("SELECT * FROM users WHERE email = ?;", email, (err, result)=> {
//     if (err) {
//       res.send({err: err})
//     } 


//     if (result.length > 0){
//       bcrypt.compare(password, result[0].password, (error, response) => {
//         if (response) {
//           req.session.user = result
//           console.log(req.session.user)
//           res.send(result)
//         } else {
//           res.send({ message: "Wrong username/password combination"})
//         }
//       })
//     } else {
//       res.send({ message: "User doesn't exist"})
//     }
    
//   });
// });

// app.listen("3001", () => {
//   console.log("running server")
// });


