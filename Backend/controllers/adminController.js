const { validationResult } = require('express-validator');
const User = require('../models/User');
const Coupon = require('../models/Coupon');

exports.getPurchaseStats = [
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        try {
            const users = await User.find({});
            let totalItemsPurchased = 0;
            let totalPurchaseAmount = 0;

            for (const user of users) {
                totalItemsPurchased += user.orders.length;
                totalPurchaseAmount += user.totalPurchaseAmount;
            }

            const coupons = await Coupon.find({ couponStatus: 1 });
            const totalCouponsUsed = coupons.length;
            const totalDiscountGiven = coupons.reduce((sum, c) => sum + c.discountAmount, 0);

            res.json({
                totalItemsPurchased,
                totalPurchaseAmount,
                totalCouponsUsed,
                totalDiscountGiven
            });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    }
];


exports.getAllCoupons = [
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        try {
            const coupons = await Coupon.find({});
            res.status(200).json(coupons);
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    }
]

exports.acceptCouponRequest = [
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        const { couponId } = req.params;

        try {
            const coupon = await Coupon.findByIdAndUpdate(
                couponId,
                { requestStatus: 1 },
                { new: true }
            );

            if (!coupon) {
                return res.status(404).json({ message: "Coupon not found" });
            }

            res.status(200).json({ message: "Coupon request accepted", coupon });
        } catch (error) {
            res.status(500).json({ message: "Server error", error: error.message });
        }
    }
]


exports.rejectCouponRequest = [
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        const { couponId } = req.params;

        try {
            const coupon = await Coupon.findByIdAndUpdate(
                couponId,
                { requestStatus: -1 },
                { new: true }
            );

            if (!coupon) {
                return res.status(404).json({ message: "Coupon not found" });
            }

            res.status(200).json({ message: "Coupon request rejected", coupon });
        } catch (error) {
            res.status(500).json({ message: "Server error", error: error.message });
        }
    }
];
