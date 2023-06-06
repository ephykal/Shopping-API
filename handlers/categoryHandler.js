const Category = require('../model/categoryModel');

// get all categories
const allCategories = async (req,res) => {
	const categoryLists = await Category.find();

	if(!categoryLists){
		return res.status(500).json({success:false})
	}
	res.status(200).send(categoryLists)
}

// category creation
const categoryCreation = async (req,res) => {
	const { name, icon, color, image } = req.body;

	try {
		const category = new Category({
			name, icon, image, color
		})

		await category
			.save()
			.then((createdCategory) => {
				res.status(201).json({createdCategory})
			})
		
	} catch (error) {
		res.status(500).json({error:'category can\'t be created', success:false})	
	}
}

module.exports = { allCategories, categoryCreation }