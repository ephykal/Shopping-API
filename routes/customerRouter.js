const express = require('express');
const router = express.Router();
const { allCustomerHandler, customerCreationHandlers } = require('../handlers/customerHandler');


router.get('/', allCustomerHandler);
router.post('/',customerCreationHandlers)

module.exports = router;