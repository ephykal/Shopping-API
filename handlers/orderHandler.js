const logger = require('../library/Logging');
const Order = require('../model/orderModel');

const allOrders = async (req,res) => {
	const orderLists = await Order.find();

	if(!orderLists) {
		res.status(500).json({error:logger.error('Internal server error order lidt cant be found'),
		success:false
		})
	};
	res.status(200).send(orderLists)
}

const orderCreation = async (req,res) => {
	const { orderItems, shippingAddress1, shippingAddress2, status, city, zip, country, phoneNo } = req.body
	
	const order = new Order({ orderItems, shippingAddress1, shippingAddress2, status, city, zip, country, phoneNo })

	await order
		.save()
		.then((createdOrder) => {res.status(201).json(createdOrder)})
		.catch((err) => {
			res.status(500).json({
				errror: logger.error('Internal server error unabele to create order'),
				success:false
			})
		})

}


module.exports = { allOrders, orderCreation}