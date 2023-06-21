const User = require('../model/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Logger = require('../library/Logger');


const registerUserMiddleware = async(req,res,next) =>{
	const {username, name, email,password} = req.body;

	try{
		const existingUser = await User.findOne({username});
		const existingUserEmail = await User.findOne({email})

		if(existingUser){
			return res.status(400).json({message:'username already exists'})
		}

		if(existingUserEmail) {
			return res.status(400).json({message:'email already'})
		}

		const newUser = new User({username, email, name, password});
		await newUser.save();

		const userId = newUser._id;
		Logger.info('user:',newUser);
		res.locals.userId = userId;
		next();
	}catch(error){
		Logger.error(error);
		return res.status(400).json({error: error.message,message:'An error occured while registering the user'})
	}
};


const loginUserMiddleware = async(req,res,next)=> {
	const {username,password} = req.body;

	try{
		const user = await User.findOne({username});
		

		if(!user){
			return res.status(400).json({message:'invalid username'})
		}
	

		const isPasswordValid = await bcrypt.compare(String(password), String(user.password));
		if(!isPasswordValid){
			return res.staus(400).json({message:'invalid password'})
		}

		const token = jwt.sign({userId:user._id}, 'my-jwt-secret', {expiresIn:'1h'})
		res.locals.token = token;
		next()
	}catch(error){
		Logger.error(error);
		return res.status(500).json({error: error.message,message:'An error occured while authenticating the user'})
	}
}

module.exports = {registerUserMiddleware, loginUserMiddleware}