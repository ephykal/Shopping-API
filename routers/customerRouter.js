const express = require('express');
const router = express.Router();
const { allCustomer, customerCreation } = require('../handlers/customerHandler');


router.get('/', allCustomer);
router.post('/',customerCreation )

module.exports = router;