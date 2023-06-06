const User = require("../model/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Logging = require('../library/Logging');

const  registerUser = async (req,res) => {
	const {username, name, email, password} = req.body;

	try {
		// check if the username already exists
		const existingUser = await User.findOne({username});

		if(existingUser){
			return res.status(409).json({error:'username alreasy exists'})
		}

		// creating a new user
		const newUser = new User({username, name, email, password});

		// saving newUser to DB
		await newUser.save();

		// accessing generated userId
		const userId = newUser._id;
		Logging.info('userID:', userId);

		res.status(201).json({message:'user successfully registered'});
	}	catch(error) {
		res.status(500).jsong({error:'an error occured while registering the user'})
	}
} 

// authenticating registred users
const loginUser = async (req,res) => {
	const {username, name, email, password} = req.body;

	try {
		// find user by username
		const user = await User.findOne({username});

		if(!user) {
			return res.status(401).json({error:'invalid username'})
		}

		// compare plain text password with hashed password
		const isPasswordValid = await bcrypt.compare(password, user.password);

		if(!isPasswordValid) {
			return res.status(401).json({error:'invalid password'})
		}

		// generating jwt
		const token = jwt.sign({userId:user._id},'your-jwt-secret', {expiresIn:'1h'});

		res.status(200).json({token});
	} catch (error) {
		console.log(error);
		res.status(500).json({error:'an error occurred while authenticatin the user'})
	}
}

module.exports = {registerUser, loginUser};

// export default {registerUser}