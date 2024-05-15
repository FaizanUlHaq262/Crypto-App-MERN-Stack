const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const router = express.Router();

//signup route
router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      username,
      email,
      password: hashedPassword
    });

    await user.save();
    res.status(201).send('User registered');
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

//login route
router.post('/login', async (req, res) => {    
  const { email, password } = req.body;     //destructure email and password from req.body
  try {
    const user = await User.findOne({ email });     //find user by email
    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'User not found' }] });     //if user not found, return error
    }

    const isMatch = await bcrypt.compare(password, user.password);    //compare password
    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });    //if password doesn't match, return error
    }

    //return user details including MongoDB's _id
    res.json({ 
      id: user._id, 
      name: user.username, 
      email: user.email 
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
