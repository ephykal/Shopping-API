const express = require('express');
const router = express.Router();
const { allCategoryHandler, categoryCreationHandler } = require('../handlers/categoryHandler');


router.get('/', allCategoryHandler);
router.post('/', categoryCreationHandler);


module.exports = router;