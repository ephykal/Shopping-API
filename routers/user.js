const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../model/user');
const Logging = require('../library/Logging')
const jwt = require("jsonwebtoken")



// configuring the register post functionality
// router.post('/register', async(req,res) => {
	
// 		const user = new User({
// 			// id: Date.now().toString(),
// 			name: req.body.name,
// 			email: req.body.email,
// 			username: req.body.username,
// 			password: req.body.password
// 		})
	
// 		user
// 			.save()
// 			.then((createdUser) => {res.status(201).json(createdUser)})
// 			.catch((err) => {
// 				res.status(500).json({
// 					error: Logging.error('Internal Server error', err),
// 					success: false
// 				})
// 			})
	

// })


router.post('/register', async (req, res) => {
  const { username,name, email, password } = req.body;

  // const userId = req.user._id;

  try {
    // Check if the username already exists
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(409).json({ error: 'Username already exists' });
    }

  
    // Create a new user
    const newUser = new User({ username, name, email, password });

    // Save the user to the database
    await newUser.save();

    // accessing the generated userID
    const userId = newUser._id;
    console.log("UserID:", userId);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while registering the user' });
  }
});


// authenticating users
router.post('/login', async (req, res) => {
  const { username, name, email, password } = req.body;

  try {
    // Find the user by username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ error: 'Invalid username' });
    }

    // Compare the provided password with the hashed password

    const isPasswordValid =  await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Generate a JWT
    const token = jwt.sign({ userId: user._id }, 'your-jwt-secret', { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'An error occurred while authenticating the user' });
  }
});

module.exports = router;