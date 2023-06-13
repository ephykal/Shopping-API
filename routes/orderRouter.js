const express = require('express');
const { allOrders, orderCreation } = require('../handlers/orderHandler');
const router = express.Router();

router.get('/', allOrders);
router.post('/', orderCreation);


module.exports = router