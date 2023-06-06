const express = require('express');
const router = express.Router();
const Category = require('../model/categoryModel');
const Logging = require('../library/Logging');
const { allCategories, categoryCreation } = require('../handlers/categoryHandler');


router.get('/', allCategories);
router.post('/', categoryCreation);


module.exports = router;