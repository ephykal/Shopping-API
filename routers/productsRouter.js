const express = require('express');
const router = express.Router();
const authUser = require('../middleware/authUser');
const { allProducts, productsByUserId, productsCreation } = require('../handlers/productsHandler');


router.get('/', allProducts);
router.get('/user/:userId', productsByUserId);
router.post('/', authUser, productsCreation);


module.exports = router