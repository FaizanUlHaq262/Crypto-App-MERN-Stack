const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  cryptoBalances: { //object to store crypto balances
    BTC: { type: Number, default: 0 },
    ETH: { type: Number, default: 0 },
    DOGE: { type: Number, default: 0 }
  }
});

module.exports = mongoose.model('user', UserSchema);
