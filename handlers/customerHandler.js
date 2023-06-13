const Customer = require('../model/customerModel');

const allCustomer = async (req,res) => {
	try {
		const customerList = await Customer.find();
		res.status(200).send(customerList)
	} catch (error) {
	res.status(500).send({success:false, err:error.message})
	}
}

// creation of customers
const customerCreation = async (req,res) => {
	const { name, email, password } = req.body;

	try {
		const customer = new Customer({
			name, email, password
		})

		await customer
			.save()
			.then((createdCustomer) => {
				res.status(201).json({createdCustomer})
			})
		
	} catch (error) {
		res.status(500).json({error:'customer can\'t be created', success:false})	
	}
}

module.exports = {allCustomer, customerCreation}