const express = require('express');
const router = express.Router();
const  { registerUser, loginUser } = require('../handlers/userHandler')


// User registration route
router.post('/register', registerUser);

// authenticatin the user
router.post('/login', loginUser)


module.exports = router;