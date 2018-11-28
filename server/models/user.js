const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_I = 10;

const userScheema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: 1
  },
  password: {
    type: String,
    required: true,
    minlength: 5
  },
  name: {
    type: String,
    required: true,
    maxlength: 100
  },
  lastname: {
    type: String,
    required: true,
    maxlength: 100
  },
  cart: {
    type: Array,
    default: []
  },
  history: {
    type: Array,
    default: []
  },
  role: {
    type: Number,
    default: 0
  },
  token: {
    type: String
  }
});

userScheema.pre('save', function(next){
  const user = this;

  if(user.isModified('password')) {
    bcrypt.genSalt(SALT_I, (err, salt) => {
      if(err) return next(err);
  
      console.log(user)
      bcrypt.hash(user.password, salt, (err, hash) => {
        if(err) return next(err);
         user.password = hash;
         next();
      })
    })
  } else {
    next()
  }
  
})

const User = mongoose.model('User', userScheema);

module.exports = { User }