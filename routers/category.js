const express = require('express');
const router = express.Router();
const Category = require('../model/category');
const Logging = require('../library/Logging');


router.get('/', async (req,res) => {
	const categoryLists = await Category.find();

	if(!categoryLists){
		res.status(500).json({success:false})
	}
	res.status(200).send(categoryLists)
})

router.post('/', (req,res) => {
	const category = new Category({
		name: req.body.name,
		icon: req.body.icon,
		color: req.body.color,
		image: req.body.image
	});

	category
		.save()
		.then((createdCategory) => {res.status(201).json(createdCategory)})
		.catch((err) => {
			res.status(500).json({
				err: Logging.error('category can\'t be created', err),
				success: false
			})
		})
})


module.exports = router;