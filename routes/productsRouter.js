const express = require('express');
const router = express.Router();
const {allProductsHandler, productsByUserIdHandler, productCreationHandler} = require('../handlers/productsHandler');

router.get('/',allProductsHandler);
router.get('/users/:userId', productsByUserIdHandler);
router.post('/', productCreationHandler)


module.exports = router;


