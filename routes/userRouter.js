const express = require('express');
const router = express.Router();
const  { registerUserHandler, loginUserHandler } = require('../handlers/userHandler')


router.post('/register', registerUserHandler);
router.post('/login', loginUserHandler)


module.exports = router;