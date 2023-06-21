const express = require('express');
const { allOrderHandler, orderCreationHandler } = require('../handlers/orderHandler');
const router = express.Router();

router.get('/', allOrderHandler);
router.post('/', orderCreationHandler);


module.exports = router