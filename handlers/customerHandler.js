const Customer = require('../model/customerModel');

const allCustomer = async (req,res) => {
	const customerList = await Customer.find();

	if(!customerList){
		return res.status(500).json({success:false})
	}
	res.status(200).send(customerList)
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