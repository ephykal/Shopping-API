const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
	orderItems: [],
	shippingAddress1:String,
	shippingAddress2: String,
	status: String,
	city: String,
	zip: String,
	country: String,
	phoneNo: Number
})

const Order = mongoose.model('order', orderSchema);

module.exports = Order;