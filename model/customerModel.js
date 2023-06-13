const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const customerSchema = new mongoose.Schema({
	name:{
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true
	}
})

// Hashing the password before saving
customerSchema.pre('save', async(next) =>{
	const customer = this;

	// hash password if new or modified
	if(!customer.isModified('password')){
		return next()
	}
	try {
		
		// generate a salt 
		const salt = await bcrypt.genSalt(10);
		
		// hash password with generated salt
		const hashedPassword = await bcrypt.hash(customer.password, salt);
		
		// replace plain-text password with hasedPassword
		customer.password = hashedPassword;
		next();
	} catch (err){
			return next(err)
	}
})

const Customer = mongoose.model('customer', customerSchema);

module.exports = Customer