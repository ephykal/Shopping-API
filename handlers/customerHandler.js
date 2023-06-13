const Customer = require('../model/customerModel');

const allCustomer = async (req,res) => {
	try {
		const customerList = await Customer.find();
		res.status(200).send(customerList)
	} catch (error) {
	res.status(500).send({success:false, err:error.message})
	}
}

const customerCreation = async (req,res) => {
	const { name, email, password } = req.body;

	try {
		const customer = new Customer({
			name, email, password
		})

		const createdCustomer = await customer.save();
		res.status(201).json({createdCustomer});
		
	} catch (error) {
		res.status(500).json({error:'customer can not  be created', success:false})	
	}
}

module.exports = {allCustomer, customerCreation}