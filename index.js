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
// const DailyReport = require('./routes/dailyreportroutes');
const todoItemRoute = require('./routes/todoroutes');
const planRoute = require('./routes/planroutes');
const monthlySheetRoute = require('./routes/monthlysheetroutes');
const incomePlanRoute = require('./routes/incomeplanroutes');
const incomeRoute = require('./routes/incomeroutes');
const expenseRoute = require('./routes/expenseroutes');
const expensePlanRoute = require('./routes/expenseplanroutes');
const userRoute = require('./routes/userroutes');
mongoose.set("strictQuery", false);

// Connect MongoDB
mongoose.connect(process.env.DB_CONNECT)
    .then(() => console.log("DB Conn Succ"))
    .catch(err => console.log(err))


// app.use('/', DailyReport);
app.use('/', todoItemRoute);
app.use('/', planRoute);
app.use('/', incomePlanRoute);
app.use('/', incomeRoute);
app.use('/', expenseRoute);
app.use('/', expensePlanRoute);
app.use('/', monthlySheetRoute);
app.use('/', userRoute);

// module.exports = app; // Export the app

//add port and connect to server
app.listen(PORT, () => console.log("Server connected"));
