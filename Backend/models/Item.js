const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  imgUrl: { type: String, required: true },
  itemName: { type: String, required: true },
  description: [{ type: String, required: true }],
  price: { type: Number, required: true }
});

module.exports = mongoose.model('Item', itemSchema);
