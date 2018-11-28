const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Mongoose setup
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE);

// Models
const { User } = require('./models/user');

// Middleware 
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());


//
// USERS
//
app.post('/api/users/register', (req, res) => {
  const user = new User(req.body);
  user.save((err, doc) => {
    if(err) return res.json({ succes: false, err})
    res.status(200).json({ succes: true, userData: doc})
  })
})



const port = process.env.port || 3002;

app.listen(port, () => {
  console.log(`server is running at ${port}`);
})