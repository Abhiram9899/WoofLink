const express = require('express');
const auth = require('../middleware/auth'); // Import shared middleware
const Pet = require('../models/Pet');
const router = express.Router();

// Get all pets for the authenticated user
router.get('/', auth, async (req, res) => {
  try {
    const pets = await Pet.find({ userId: req.user.userId });
    res.json(pets);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Delete a pet
router.delete('/:id', auth, async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) return res.status(404).json({ msg: 'Pet not found' });

    if (pet.userId.toString() !== req.user.userId) {
      return res.status(401).json({ msg: 'Not authorized to delete this pet' });
    }

    await pet.remove();
    res.json({ msg: 'Pet deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;