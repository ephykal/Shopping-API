const jwt = require('jsonwebtoken');
const User = require('../model/userModel');

const authUser = async(req,res,next) => {
	try {
		// get JWT token from the req headers
		const token = req.headers.authorization.split(" ")[1];
		if(!token){
			return res.status(401).send({message:"UnAuthorized"})
		}

		// verify the JWT token and decode the payload
		try {
			const decoded = jwt.verify(token,'your-jwt-secret');
			// const userId = decodedToken.userId
			const userId = decoded.userId
		} catch (error) {
			console.log(error)
			return res.status(401).json({message:"Expired Token"})
		}
		res.send({message:"Hello, your token has been verified"})

		const decoded = jwt.verify(token,'your-jwt-secret');
			// const userId = decodedToken.userId
			const userId = decoded.userId
		// find the user based on the decoded User ID
		const user = await User.findById(userId);
		if(!user){
			res.status(401).send({message:"Unauthorized ID"})
		}

		// attach the user to req object
		req.user = user

		// proceed to the next middleware
		next();
	} catch (error) {
		console.log('Failed to authenticate', error)
		res.status(500).json({message:"Failed to authenticate"})
	}
};

module.exports = authUser