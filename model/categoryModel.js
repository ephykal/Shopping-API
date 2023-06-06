const mongoose = require('mongoose');

// creating category schema
const categorySchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	icon: {
		type: String,
		required: false,
	},
	image: {
		type: String,
		required: true,
	},
	color: {
		type: String,
		required: true
	}
})

const Category = mongoose.model('category', categorySchema);


module.exports = Category;