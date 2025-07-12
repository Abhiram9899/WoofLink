const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  petId: { type: mongoose.Schema.Types.ObjectId, ref: 'Pet', required: true },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    zip: { type: String, required: true },
  },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  notes: { type: String },
  status: { type: String, default: 'Pending' },
});

module.exports = mongoose.model('Booking', bookingSchema);