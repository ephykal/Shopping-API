const Order = require('../model/orderModel');
const Logger = require('../library/Logger');

const allOrderMiddleware = async(req,res,next)=> {
	try {
		const orderList = await Order.find();
		res.locals.orderList = orderList
		next();
	} catch (error) {
		Logger.error(error);
		return res.status(500).json({error:error.message, success:false})
	}
}

const orderCreationMiddleware = async(req,res,next)=>{
	const { orderItems, shippingAddress1, shippingAddress2, status, city, zip, country, phoneNo } = req.body

	try{
		const order = new Order({orderItems, shippingAddress1, shippingAddress2, status, city, zip, country, phoneNo})

		const createdOrder = await order.save();
		res.locals.createdOrder = createdOrder;
		next();
	}catch(error){
		Logger.error(error);
		return res.status(500).json({error: error.message, message:"order can not be created", success:false})
	}
}

module.exports = {allOrderMiddleware, orderCreationMiddleware}