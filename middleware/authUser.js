const jwt = require('jsonwebtoken');
const User = require('../model/userModel');

const authUser = async(req,res,next) => {
	try {

		const token = req.headers.authorization.split(" ")[1];
		if(!token){
			return res.status(401).send({message:"UnAuthorized"})
		}

		try {
			const decoded = jwt.verify(token,'your-jwt-secret');
			const userId = decoded.userId
		} catch (error) {
			console.log(error)
			return res.status(401).json({message:"Expired Token"})
		}
		

		const decoded = jwt.verify(token,'your-jwt-secret');
			const userId = decoded.userId
		const user = await User.findById(userId);
		if(!user){
			res.status(401).send({message:"Unauthorized ID"})
		}

		req.user = user

		next();
	} catch (error) {
		console.log('Failed to authenticate', error)
		res.status(500).json({message:"Failed to authenticate"})
	}
};

module.exports = authUser