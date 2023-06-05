const express = require('express');
const router = express.Router();
const Order = require('../model/order');
const Logging = require('../library/Logging')

router.get('/', async(req,res)=> {
	const orderLists = await Order.find();

	if(!orderLists){
		res.status(500).json({
			error:Logging.error(`Internal server error order list can't be found`,),
			success:false
		})
	};

	res.status(200).send(orderLists)
})


router.post('/', (req,res) => {
	const order = new Order({
		orderItems: req.body.orderItems,
		shippingAddress1: req.body.shippingAddress1,
		shippingAddress2: req.body.shippingAddress2,
		status: req.body.status,
		city: req.body.city,
		zip: req.body.zip,
		country: req.body.country,
		phoneNo: req.body.phoneNo
	});

	order
		.save()
		.then((createdOrder) => {res.status(201).json(createdOrder)})
		.catch((err) => {
			res.status(500).json({
				error: Logging.error('Internal server error unable to create order'),
				success: false
			})
		})
})

module.exports = router