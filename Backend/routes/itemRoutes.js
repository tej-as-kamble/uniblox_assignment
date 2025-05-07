const express = require('express');
const router = express.Router();
const Item = require('../models/item');


router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});


router.post('/', async (req, res) => {
  const { imgUrl, itemName, description, price } = req.body;

  if (!imgUrl || !itemName || !description || price == null) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newItem = new Item({
      imgUrl,
      itemName,
      description,
      price
    });

    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
