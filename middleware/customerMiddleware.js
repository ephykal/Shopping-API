const Customer = require('../model/customerModel');
const Logger = require('../library/Logger');

const allCustomerMiddleware = async(req,res,next) =>{
	try {
		const customerList = await Customer.find();
		res.locals.customerList  = customerList
		next();
	} catch (error) {
		Logger.error(error)
		return res.status(500).json({success:false,err:error.message})
	}
}

const customerCreationMiddleware = async(req,res,next) => {
	const {name,email,password} = req.body;

	try {
		const existingCustomer = await Customer.findOne({email});

		if(existingCustomer){
			return res.status(400).json({error:"email already exists"})
		}

		const customer = new Customer({
			name,email,password
		})
		const createdCustomer = await customer.save();
		res.locals.createdCustomer = createdCustomer
		next();
	} catch (error) {
		Logger.error(error);
		return res.status(500).json({error:"customer can not be created", success:false})
	}
}

module.exports = {allCustomerMiddleware, customerCreationMiddleware}