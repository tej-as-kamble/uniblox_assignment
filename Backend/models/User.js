const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cart: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
  coupon: { type: Number, enum: [-1, 0, 1], default: 0 },
  orderCount: { type: Number, default: 0 },
  totalPurchaseAmount: { type: Number, default: 0 }
});

module.exports = mongoose.model('User', userSchema);
