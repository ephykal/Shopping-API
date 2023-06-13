const User = require("../model/userModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Logger = require("../library/Logging");

const  registerUser = async (req,res) => {
	const {username, name, email, password} = req.body;

	try {
		const existingUser = await User.findOne({username});

		if(existingUser){
			return res.status(409).json({error:'username alreasy exists'})
		}

		const newUser = new User({username, name, email, password});

		await newUser.save();

		const userId = newUser._id;
		Logger.info('user:', newUser);

		res.status(201).json({message:'user successfully registered'});
	}	catch(error) {
		res.status(500).json({error:'an error occured while registering the user'})
	}
} 


const loginUser = async (req,res) => {
	const {username, name, email, password} = req.body;

	try {
		
		const user = await User.findOne({username});

		if(!user) {
			return res.status(401).json({error:'invalid username'})
		}

	
		const isPasswordValid = await bcrypt.compare(String(password), String(user.password));

		if(!isPasswordValid) {
			return res.status(401).json({error:'invalid password'})
		}

		
		const token = jwt.sign({userId:user._id},'your-jwt-secret', {expiresIn:'1h'});

		res.status(200).json({token});
	} catch (error) {
		Logger.error(error);
		res.status(500).json({error:'an error occurred while authenticatin the user'})
	}
}

module.exports = {registerUser, loginUser};

