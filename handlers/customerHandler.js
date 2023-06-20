// const Customer = require('../model/customerModel');

// const allCustomer = async (req,res) => {
// 	try {
// 		const customerList = await Customer.find();
// 		res.status(200).send(customerList)
// 	} catch (error) {
// 	res.status(500).send({success:false, err:error.message})
// 	}
// }

// const customerCreation = async (req,res) => {
// 	const { name, email, password } = req.body;

// 	try {
// 		const customer = new Customer({
// 			name, email, password
// 		})

// 		const createdCustomer = await customer.save();
// 		res.status(201).json({createdCustomer});
		
// 	} catch (error) {
// 		res.status(500).json({error:'customer can not  be created', success:false})	
// 	}
// }

// module.exports = {allCustomer, customerCreation}



const customerMiddleware = require('../middleware/customerMiddleware');

const allCustomerHandler = [customerMiddleware.allCustomerMiddleware, async(req,res)=>{
	const customerList = res.locals.customerList;
	res.status(200).send(customerList)
}]

const customerCreationHandlers = [customerMiddleware.customerCreationMiddleware, async(req,res)=>{
	const createdCustomer = res.locals.createdCustomer;
	res.status(200).json({createdCustomer})
}]

module.exports = {allCustomerHandler, customerCreationHandlers}