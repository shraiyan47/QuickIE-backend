const express = require("express");
const mongoose = require("mongoose");
var cors = require('cors');
const dotenv = require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

//port
const PORT = process.env.PORT || 5000;

// import routes

const contactusRoute = require('./routes/contactroutes');
const planRoute = require('./routes/planroutes');
const monthlySheetRoute = require('./routes/monthlysheetroutes'); 
const accountRoute = require('./routes/accountroutes');
const planningRoute = require('./routes/planningroutes');
const userRoute = require('./routes/userroutes');
mongoose.set("strictQuery", false);

// Connect MongoDB
mongoose.connect(process.env.DB_CONNECT)
    .then(() => console.log("DB Conn Succ"))
    .catch(err => console.log(err))


app.use('/', contactusRoute); 
app.use('/', planRoute); 
app.use('/', accountRoute);
app.use('/', planningRoute);
app.use('/', monthlySheetRoute);
app.use('/', userRoute);

// module.exports = app; // Export the app

//add port and connect to server
app.listen(PORT, () => console.log("Server connected"));
