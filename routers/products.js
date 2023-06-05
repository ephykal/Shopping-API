const express = require('express');
const router = express.Router();
const Product = require('../model/products');
const jwt = require('jsonwebtoken')
const authUser = require('../middleware/authUser')

// router.get('/',(req,res)=>{
// 	res.status(200).send('Hello API!')
// })

router.get(`/`,async (req,res)=>{
	const productsList = await Product.find()

	if(!productsList){
		res.status(500).json({success:false})
	}
	res.status(200).send(productsList)
	
});

// Get all products posted by a specific user
router.get('/user/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const productsById = await Product.find({ user: userId });
    res.status(200).json(productsById);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

router.post(`/`, authUser, async (req,res) => {
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
		// .then((createdProduct) => {res.status(201).json(createdProduct)})

	} catch (err) {
		console.log(err)
		res.status(500).json({
			error: err,
			message: 'Faied to create products',
			success: false
		})
	}

	// const products = await Product.find({ userId: userId });
	// console.log(products)
	console.log('Hello world')
	
})


module.exports = router