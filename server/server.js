const express = require('express');
const app = express();
const port = 5001;
const cors = require("cors");
//const cookieParser = require('cookie-parser');
const session = require("express-session");

require('./config/db')




const bodyParser = require('express').json;
app.use(bodyParser());
app.use(cors({
    origin: "http://localhost:3002",
    methods: ["GET", "POST", "PUT"],
    credentials: true
}));

app.use(session({
    key: "userId",
    secret: "subscribe_to_findacook",
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        expires: 86400000,
    }
}))

//app.use(cookieParser());

const UserRouter = require('./api/User');
const CookRouter = require('./api/Cook');

app.use('/user', UserRouter)
app.use('/cook', CookRouter)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

module.exports = app;