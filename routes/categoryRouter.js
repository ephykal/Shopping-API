const express = require('express');
const router = express.Router();
const Logging = require('../library/Logger');
const { allCategories, categoryCreation } = require('../handlers/categoryHandler');


router.get('/', allCategories);
router.post('/', categoryCreation);


module.exports = router;