const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'User must have a name.'],
  },
  email: {
    type: String,
    required: [true, 'User must have an email.'],
  },
  password: {
    type: String,
    required: [true, 'User must have a password.'],
  },
});

mongoose.model('User', userSchema);
