const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mail: { type: String, required: true },
  discountCode: { type: String, required: true }, // e.g., "JohnSAVE10"
  couponStatus: { type: Number, enum: [0, 1], default: 0 },
  discountAmount: { type: Number, default: 0 },
  requestStatus: { type: Number, enum: [-1, 0, 1], default: 0 }
});

module.exports = mongoose.model('Coupon', couponSchema);
