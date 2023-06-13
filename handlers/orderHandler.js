const Logger = require('../library/Logging');
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
	
	const order = new Order({ orderItems, shippingAddress1, shippingAddress2, status, city, zip, country, phoneNo })

	await order
		.save()
		.then((createdOrder) => {res.status(201).json(createdOrder)})
		.catch((err) => {
			res.status(500).json({
				errror: Logger.error('Internal server error unabele to create order'),
				success:false
			})
		})

}


module.exports = { allOrders, orderCreation}