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