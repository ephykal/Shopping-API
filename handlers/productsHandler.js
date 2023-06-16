const Product = require('../model/productsModel');
const Logger = require('../library/Logger');

const allProducts = async (req, res) => {
  try {
    const productsList = await Product.find();
    res.status(200).send(productsList);
  } catch (error) {
    Logger.error(error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

const productsByUserId = async (req, res) => {
  const userId = req.params.userId;

  try {
    const productsById = await Product.find({ user: userId });
    res.status(200).json(productsById);
  } catch (error) {
    Logger.error(error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

const productsCreation = async (req, res) => {
  const userId = req.user._id;
  try {
    const product = new Product({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      user: userId,
    });
    await product.save();
    res.status(200).json({product});
    Logger.info(product);
  } catch (err) {
		res.status(500).json({
			error: err,
      message: 'Failed to create products',
      success: false,
    });
		Logger.error(err);
  }
};


module.exports = { allProducts, productsByUserId, productsCreation };
