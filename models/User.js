const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }, 
  progress: {
    level: { type: Number, default: 1 },
    score: { type: Number, default: 0 }
  }
});

module.exports = mongoose.model('User', UserSchema);
