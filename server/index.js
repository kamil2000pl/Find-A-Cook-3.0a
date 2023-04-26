const express = require('express');
const app = express();
const stripe = require('stripe')('STRIPE_API_SECRET_KEY');

// const connectDB = require('../database/db');
// const connectDB = require('../database/db');
const cors = require('cors');
const morgan = require('morgan');
const categoryRoutes = require('./routes/category');
// const cookRoutes = require('./routes/cook');
// const userRoutes = require('./routes/user');
const productRoutes = require('./routes/product');
const filterRoutes = require('./routes/filter');
// const subscriptionController = require('./routes/subscribe')
const mongoose = require('mongoose');

app.use(cors());
app.use(express.json());
app.use('/api/category', categoryRoutes);
// app.use('/api/cook', cookRoutes);
// app.use('/api/user', userRoutes);
// app.use('/api/subscribe', subscriptionController);
app.use('/api/product', productRoutes);
app.use('/uploads', express.static('uploads'));
app.use('/api/filter', filterRoutes);


app.post('/create_customer', async (request, response) => {
    const customerEmailAddress = request.body.customerEmailId;
    const customer = await stripe.customers.create({
        description: `${customerEmailAddress} via API`,
        email: customerEmailAddress
    });
    console.log(customer);
    let theCreatedCustomerId = customer.id;
    response.send({
        customerId: theCreatedCustomerId
    });
});

app.post('/create_checkout_link', async (request, response) => {
    const priceId = request.body.priceId;
    const customerId = request.body.customerId;
    const session = await stripe.checkout.sessions.create({
        billing_address_collection: 'auto',
        line_items: [
            {
                price: priceId,
                quantity: 1,
            },
        ],
        mode: 'subscription',
        success_url: `http://localhost:3002/paymentsuccessful/?success=true`,
        cancel_url: `http://localhost:3002/paymentunsuccessful/?canceled=true`,
        customer: customerId
    });
    console.log(session);
    response.send({
        url: session.url
    });
});



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

const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Listening on port ${port}`));
