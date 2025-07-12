const express = require('express');
const auth = require('../middleware/auth.js'); // Import shared middleware
const multer = require('multer');
const Pet = require('../models/Pet');
const Booking = require('../models/Booking');
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

router.post('/pets', auth, upload.single('photo'), async (req, res) => {
  const { name, type, age, instructions } = req.body;
  try {
    const pet = new Pet({
      userId: req.user.userId,
      name,
      type,
      age,
      photo: req.file ? req.file.path : null,
      instructions,
    });
    await pet.save();
    res.json(pet);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

router.post('/', auth, async (req, res) => {
  const { petId, address, startDate, endDate, notes } = req.body;
  try {
    const booking = new Booking({
      userId: req.user.userId,
      petId,
      address,
      startDate,
      endDate,
      notes,
    });
    await booking.save();
    res.json(booking);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.userId }).populate('petId');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;