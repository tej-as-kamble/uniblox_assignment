const express = require('express');
const router = express.Router();
const adminController = require("../controllers/adminController");
const adminAuth = require("../middleware/adminAuth");

router.get('/purchase-stats', adminAuth, adminController.getPurchaseStats);
router.get('/coupons', adminAuth, adminController.getAllCoupons);
router.post('/coupons-accept/:couponId', adminAuth, adminController.acceptCouponRequest);
router.post('/coupons-reject/:couponId', adminAuth, adminController.rejectCouponRequest);


module.exports = router;
