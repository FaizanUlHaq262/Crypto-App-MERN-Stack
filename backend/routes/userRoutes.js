const express = require('express');
const User = require('../models/User');
const router = express.Router();

//fetch currentt user balance
router.get('/balance/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);      //find user by id
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });   //if user not found, return error
    }
    res.json(user.cryptoBalances);      //return user's crypto balances
  } catch (error) {
    console.error(error);     //log error to console
    res.status(500).json({ msg: 'Server error' });      //return server error
  }
});

//updation user balance after purchasing crypto into their wallets (mongodb)
router.post('/purchase/:userId', async (req, res) => {
  const { crypto, amount } = req.body;        //destructure crypto and amount from req.body
  try {
    const user = await User.findById(req.params.userId);        //find user by id
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });       //if user not found, return error
    }
    user.cryptoBalances[crypto] = (user.cryptoBalances[crypto] || 0) + parseFloat(amount);    //update user's crypto balance
    await user.save();
    res.json({ msg: 'Purchase successful', balances: user.cryptoBalances });      //return success message and updated balances
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });      //return server error
  }
});

module.exports = router;
