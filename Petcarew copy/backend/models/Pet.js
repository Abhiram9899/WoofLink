const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  type: { type: String, required: true },
  age: { type: Number, required: true },
  photo: { type: String },
  instructions: { type: String },
});

module.exports = mongoose.model('Pet', petSchema);