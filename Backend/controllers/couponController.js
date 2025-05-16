const Coupon = require('../models/Coupon');

exports.getCouponStatus = [
  async (req, res) => {
    try {
      const user = req.user;
      const email = user.email;

      const n = parseInt(process.env.DISCOUNT_NTH_ORDER);
      const { coupon, orderCount } = user;

      const remaining = orderCount % n === 0 ? 0 : n - (orderCount % n);

      if (coupon === 0) {
        return res.status(200).json({ coupon: 0, orderCount, remaining });
      }
      
      if (coupon === 1) {
        const couponAcc = await Coupon.findOne({ mail: email, couponStatus: 0, requestStatus: 1});
        if (couponAcc) {
          return res.status(200).json({ coupon: 1, isCoupon: 1, discountCode: couponAcc.discountCode});
        } 
        
        const coupon0 = await Coupon.findOne({ mail: email, couponStatus: 0, requestStatus: 0});
        if (coupon0) {
          return res.status(200).json({ coupon: 1, isCoupon: 0 });
        }

        const couponRej = await Coupon.findOne({ mail: email, couponStatus: 0, requestStatus: -1});

        if (couponRej) {
          user.coupon = 0;
          await user.save();
          return res.status(200).json({ coupon: 0, orderCount, remaining, message: 'Coupon request was rejected' });
        }
      }
      res.status(400).json({ message: 'Invalid coupon value' });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
];




exports.createCoupon = [
  async (req, res) => {
    try {
      const user = req.user;
      const { name, email } = user;

      user.coupon = 1;
      await user.save();

      const firstName = name.trim().split(' ')[0];

      const activeCoupon = await Coupon.findOne({ mail: email, couponStatus: 0, requestStatus: { $ne: -1 } });
      if (activeCoupon) {
        return res.status(400).json({ message: 'Coupon already exists for this user' });
      }

      
      const count = await Coupon.countDocuments({ mail: email });
      const discountCode = `${firstName}${count + 1}SAVE10`;

      const newCoupon = new Coupon({
        name,
        mail: email,
        discountCode
      });

      await newCoupon.save();

      res.status(201).json({
        message: 'Coupon created successfully',
        discountCode: newCoupon.discountCode
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
];


exports.verifyCoupon = [
  async (req, res) => {
    try {
      const { code } = req.query;
      const user = req.user;

      const activeCoupon = await Coupon.findOne({ discountCode : code, couponStatus: 0, requestStatus: 1});
      if (!activeCoupon) {
        return res.status(400).json({ verification: 0, message: 'INVALID Coupon' });
      }

      if(activeCoupon.mail === user.email){
        res.status(201).json({ verification: 1, message: 'Coupon verified successfully'});
      } else {
        return res.status(400).json({ verification: 0, message: 'INVALID user' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
];
