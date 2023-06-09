const express = require('express');
const router = express.Router();
const { allCategories, categoryCreation } = require('../handlers/categoryHandler');


router.get('/', allCategories);
router.post('/', categoryCreation);


module.exports = router;