const express = require('express');
const router = express.Router();
const Customer = require('../model/customer');
const Logging = require('../library/Logging')
// const dot = require('dotenv/config');

router.get('/', async(req,res) => {
	const customerList = await Customer.find();

	if(!customerList){
		res.status(500).json({success:false})
	}
	res.status(200).send(customerList)
})

router.post('/', (req,res) => {
	const customer = new Customer({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password
	});

	customer
		.save()
		.then((createdCustomer) => {res.status(201).json(createdCustomer)})
		.catch((err)=>{
			res.status(500).json({
				error: Logging.error('Internal server error, pls refresh your connection', err),
				success: false
			})
		})
})

module.exports = router;