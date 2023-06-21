const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
	},
  username: {
    type: String,
    required: true,
		unique: true,
  },
  password: {
    type: String,
    minlength:6,
    required: true
  }
});


userSchema.pre('save', async function (next) {
  const user = this;

  if (!user.isModified('password')) {
    return next();
  }

  try {
		
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});

const User = mongoose.model('user', userSchema)

module.exports = User