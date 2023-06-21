const Category = require('../model/categoryModel');
const Logger = require('../library/Logger');

const allCategoryMiddlware = async(req,res,next) =>{
	try {
		const categoryLists = await Category.find();
		res.locals.categoryLists = categoryLists
		next();
	} catch (error) {
		Logger.error(error);
		return res.status(500).json({error:error.message, success:false})
	}
}


const categoryCreationMiddleware = async (req,res,next)=>{
	const {name,icon,color,image} = req.body;
	
	try {
		const category = new Category({
			name,icon,color,image
		})
		const createdCategory = await category.save();
		res.locals.createdCategory = createdCategory
		next();
	} catch (error) {
		Logger.error(error)
		return res.status(500).json({error: error.message, message:"category can not be created", success:false})
	}
}

module.exports = {allCategoryMiddlware, categoryCreationMiddleware}
