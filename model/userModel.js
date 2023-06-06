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
    required: true
  }
});

// Hash the password before saving
userSchema.pre('save', async function (next) {
  const user = this;

  if (!user.isModified('password')) {
    return next();
  }

  try {
		// Generate a salt to hash the password
    const salt = await bcrypt.genSalt(10);

		// Hash the password with the generated salt
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});

// Create and export the user model
const User = mongoose.model('user', userSchema)

module.exports = User
