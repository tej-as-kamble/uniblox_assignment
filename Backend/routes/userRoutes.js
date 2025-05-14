const express = require('express');
const router = express.Router();
const userAuth = require('../middleware/userAuth');
const userController = require("../controllers/userController");
const couponController = require("../controllers/couponController");

router.get("/get-cart", userAuth, userController.getCart);
router.post("/add-item", userAuth, userController.addToCart);
router.post("/remove-item", userAuth, userController.removeFromCart);
router.post("/increase-quantity", userAuth, userController.increaseQuantity);
router.post("/decrease-quantity", userAuth, userController.decreaseQuantity);


router.get("/coupon-status", userAuth, couponController.getCouponStatus);
router.post("/create-coupon", userAuth, couponController.createCoupon);


module.exports = router;
