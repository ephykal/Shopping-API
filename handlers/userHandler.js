const { registerUserMiddleware, loginUserMiddleware } = require('../middleware/userMiddleware')

const registerUserHandler = [registerUserMiddleware, async(req,res)=>{
	const userId = res.locals.userId;
	res.status(200).json({userId:userId})
}]

const loginUserHandler = [loginUserMiddleware, async(req,res)=>{
	const token = res.locals.token;
	res.status(200).json({token:token})
}]


module.exports = {registerUserHandler, loginUserHandler}