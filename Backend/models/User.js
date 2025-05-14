const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cart: [
    {
      item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
      quantity: { type: Number, required: true, default: 1 }
    }
  ],
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
  coupon: { type: Number, enum: [0, 1], default: 0 },
  orderCount: { type: Number, default: 0 },
  totalPurchaseAmount: { type: Number, default: 0 }
});

module.exports = mongoose.model('User', userSchema);
