const Product = require('../model/products');


const allProducts = async (req,res) => {
	const productsList = await Product.find();

	if(!productsList) {
		return res.status(500).json({success:false})
	}
	res.status(200).send(productsList);
}

// get all products posted by a specific user
const productsByUserId = async (req,res) => {
	const userId = req.params.userId;

	try {
		const productsById = await Product.find({user:userId});
		res.status(200).json(productsById)
	} catch (error) {
		res.status(500).json({error:'failed to fetch products'})
	}
}


// posting products by a specific user
// const productsCreation = async , authUser(req,res) => {
// 	const userId = req.user._id
// }

const productsCreation = async(req,res) => {
	const userId = req.user._id;

	try {
		
		const product = new Product({
			name: req.body.name,
			description: req.body.description,
			price: req.body.price,
			user: userId,
		});
		console.log(product)
		product
		.save()

	} catch (err) {
		console.log(err)
		res.status(500).json({
			error: err,
			message: 'Faied to create products',
			success: false
		})
	}
}


module.exports = { allProducts, productsByUserId, productsCreation}