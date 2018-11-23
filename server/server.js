const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Mongoose setup
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE);

// Middleware 
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());



const port = process.env.port || 3002;

app.listen(port, () => {
  console.log(`server is running at ${port}`);
})