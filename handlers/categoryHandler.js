const {allCategoryMiddlware, categoryCreationMiddleware} = require('../middleware/categoryMiddleware');

const allCategoryHandler = [allCategoryMiddlware, async(req,res)=>{
	const categoryLists = res.locals.categoryLists;
	res.status(200).send(categoryLists)
}]

const categoryCreationHandler = [categoryCreationMiddleware, async(req,res) => {
	const createdCategory = res.locals.createdCategory;
	res.status(200).json(createdCategory);
}]

module.exports = {allCategoryHandler, categoryCreationHandler}