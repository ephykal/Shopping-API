const {allOrderMiddleware, orderCreationMiddleware} = require('../middleware/orderMiddleware');

const allOrderHandler = [allOrderMiddleware, async(req,res)=>{
	const orderList = res.locals.orderList;
	res.status(200).json({orderList})
}]

const orderCreationHandler = [orderCreationMiddleware, async(req,res)=>{
	const createdOrder = res.locals.createdOrder;
	res.staus(200).json({createdOrder})
}]


module.exports = {allOrderHandler, orderCreationHandler}