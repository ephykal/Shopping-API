const Logger = require('../library/Logger');
const Order = require('../model/orderModel');

const allOrders = async (req,res) => {
	try {
		const orderList = await Order.find();
		res.status(200).send(orderList);
	} catch (error) {
		res.status(500).send({success:false, err:error.message})
	}
}

const orderCreation = async (req,res) => {
	const { orderItems, shippingAddress1, shippingAddress2, status, city, zip, country, phoneNo } = req.body

	try {
		const order = new Order({orderItems, shippingAddress1, shippingAddress2, status, city, zip, country, phoneNo});

		const createdOrder = await order.save();
		res.status(201).json({createdOrder})
	} catch (error) {
		res.status(500).json({
			errror: Logger.error('Internal server error unabele to create order'),
			success:false
		})
	}
}


module.exports = { allOrders, orderCreation}