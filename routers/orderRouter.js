const express = require('express');
const { allOrders, orderCreation } = require('../handlers/orderHandler');
const router = express.Router();


// getting all orders
router.get('/', allOrders);

// orders creation 
router.post('/', orderCreation);


module.exports = router