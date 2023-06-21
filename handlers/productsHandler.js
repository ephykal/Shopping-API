const {
  authUser,
  allProductsMiddlware,
  productsByUserIdMiddleware,
  productsCreationMiddleware
} = require('../middleware/productsMiddleware');

const allProductsHandler = [authUser,allProductsMiddlware,(req,res)=>{
  const productsList = res.locals.productsList
  res.status(200).json({productsList})
}]

const productsByUserIdHandler = [authUser,productsByUserIdMiddleware,(req,res)=>{
  const productsById = res.locals.productsById;
  res.status(200).json({productsById});
}]

const productCreationHandler = [authUser,productsCreationMiddleware, (req, res) => {
  const createdProduct = res.locals.createdProduct;
  res.status(200).json(createdProduct)
}]


module.exports = {allProductsHandler, productsByUserIdHandler, productCreationHandler};


