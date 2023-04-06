const app = require('express')();
const port = 5001;
const cors = require("cors");
//const cookieParser = require('cookie-parser');
const session = require("express-session");

require('./config/db')

const UserRouter = require('./api/User');
const CookRouter = require('./api/Cook')

app.use(session({
    key: "userId",
    secret: "subscribe_to_findacook",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60 * 60 * 24,
    }
}))

const bodyParser = require('express').json;
app.use(bodyParser());
app.use(cors({
    origin: ["http://localhost:3002"],
    methods: ["GET", "POST"],
    credentials: true
}));

//app.use(cookieParser());



app.use('/user', UserRouter)
app.use('/cook', CookRouter)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})