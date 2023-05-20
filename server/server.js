const app = require('express')();
const port = 5001;
const cors = require("cors");
const stripe = require('stripe')('sk_test_51MYbfMDYuzoeBKxGcMhrNfA5j9wjsN4QqBDDofXq7ZXgfJhZB1K5R9MrUQZAEGVdzUgxgFcLyzSWIXLgbtUSD2Fz00NY3BBAUN');
//const cookieParser = require('cookie-parser');
const session = require("express-session");

require('./config/db')

const UserRouter = require('./api/User');
const CookRouter = require('./api/Cook');



const bodyParser = require('express').json;
app.use(bodyParser());
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true
}));


/** 
 * STRIPE SUBSCRIPTION REFERENCE:
Badami, K. (2022). React JS: A Detailed Stripe Subscription Example (For SAAS). [online] LiveFireDev. Available at: https://livefiredev.com/react-js-a-detailed-stripe-subscription-example-for-saas/ [Accessed 8 Mar. 2023].
*/
// Route to create a Stripe checkout session and return its URL
app.post('/create_checkout_link', async (request, response) => {
    // Extract the price ID and customer email from the request body
    const priceId = request.body.priceId;
    const cook_email = request.body.customerEmailId;
    
    // Log the customer email for debugging purposes
    console.log("cook_email", cook_email);
    
    // Create a new Stripe checkout session with the specified parameters
    const session = await stripe.checkout.sessions.create({
        billing_address_collection: 'auto',
        line_items: [
            {
                price: priceId,
                quantity: 1,
            },
        ],
        mode: 'subscription',
        success_url: `http://localhost:3002/paymentsuccessful/?success=true&cook_email=${cook_email}`,
        cancel_url: `http://localhost:3002/paymentunsuccessful/?canceled=true`,
        customer_email: cook_email
    });
    
    // Log the session object for debugging purposes
    console.log(session);
    
    // Send the URL of the new checkout session to the client
    response.send({
        url: session.url
    });
});

// Route to create a new Stripe subscription
app.post('/create-subscription', async (req, res) => {
    // Call the `createSubscription` function with the request body as its argument
    const subscription = await createSubscription(req.body);
    
    // Send the subscription object back to the client
    res.send(subscription);
});

// Helper function to create a new Stripe subscription
async function createSubscription({name, email, paymentMethod, priceId}) {
    // Create a new Stripe customer with the specified name, email, and payment method
    const customer = await stripe.customers.create({
        name: name,
        email: email,
        payment_method: paymentMethod,
        invoice_settings: {
            default_payment_method: paymentMethod,
        },
    });

    // Create a new Stripe subscription with the specified customer and price ID
    const subscription = await stripe.subscriptions.create({
        customer: customer.id,
        items: [{ price: priceId }],
        payment_settings: {
            payment_method_options: {
                card: {
                    request_three_d_secure: 'any',
                },
            },
            payment_method_types: ['card'],
            save_default_payment_method: 'on_subscription',
        },
        expand: ['latest_invoice.payment_intent'],
    });

    // Return the client secret and subscription ID, along with the customer email
    return {
        clientSecret: subscription.latest_invoice.payment_intent.client_secret,
        subscriptionId: subscription.id,
        customerEmail: email // adding email to the response
    };
}


//app.use(cookieParser());

app.use(session({
    key: "userId",
    secret: "subscribe_to_findacook",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 86400000,
    }
}))


app.use('/user', UserRouter)
app.use('/cook', CookRouter)


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})