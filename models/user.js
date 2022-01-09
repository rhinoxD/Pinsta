const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

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
  pic: {
    type: String,
    default:
      'https://res.cloudinary.com/dgcs2lm7o/image/upload/v1641732230/avatar_varurs.png',
  },
  followers: [{ type: ObjectId, ref: 'User' }],
  following: [{ type: ObjectId, ref: 'User' }],
});

mongoose.model('User', userSchema);
