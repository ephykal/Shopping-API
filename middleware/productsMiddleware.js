const jwt = require('jsonwebtoken');
const User = require('../model/userModel');
const Product = require('../model/productsModel');
const Logger = require('../library/Logger');

const authUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).send({ message: "Unauthorized" });
    }

    try {
      const decoded = jwt.verify(token, 'my-jwt-secret');
      const userId = decoded.userId;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(401).send({ message: "Unauthorized ID" });
      }

      req.user = user;
      next();
    } catch (error) {
      console.log(error);
      return res.status(401).json({ message: "Expired Token" });
    }
  } catch (error) {
    console.log('Failed to authenticate', error);
    res.status(500).json({ message: "Failed to authenticate" });
  }
};

const allProductsMiddlware = async (req, res, next) => {
  try {
    const productsList = await Product.find();
    res.locals.productsList = productsList;
    next();
  } catch (error) {
    Logger.error(error);
    return res.status(500).json({ error: error.message, message: 'Failed to fetch products' });
  }
};

const productsByUserIdMiddleware = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const productsById = await Product.find({ user: userId });
    res.locals.productsById = productsById;
    next();
  } catch (error) {
    Logger.error(console.error());
    return res.status(500).json({ error: error.message, message: `Can not fetch products posted by ${userId}` });
  }
};

const productsCreationMiddleware = async (req, res, next) => {
  const { name, description, price, user } = req.body;
  try {
    const userId = req.user._id; 
    if (!userId) {
      return res.status(401).send({ message: "Unauthorized" });
    }

    const product = new Product({ name, description, price, user: userId });
    const createdProduct = await product.save();
    res.locals.createdProduct = createdProduct;
    next();
  } catch (error) {
    Logger.error(error);
    return res.status(500).json({ error: error.message, message: 'Failed to create products' });
  }
};

module.exports = {
  authUser,
  allProductsMiddlware,
  productsByUserIdMiddleware,
  productsCreationMiddleware
};
