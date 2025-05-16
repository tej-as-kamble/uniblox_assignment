const { body, validationResult } = require('express-validator');
const Coupon = require('../models/Coupon');

// Add an item to cart
exports.addToCart = [
  body('itemId').notEmpty().withMessage('Item ID is required'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { itemId } = req.body;
    const user = req.user;

    try {
      const itemInCart = user.cart.find(ci => ci.item.toString() === itemId);
      if (itemInCart) {
        itemInCart.quantity += 1;
      } else {
        user.cart.push({ item: itemId, quantity: 1 });
      }

      await user.save();
      res.status(200).json({ message: 'Item added to cart', cart: user.cart });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
];

// Remove an item from cart
exports.removeFromCart = [
  body('itemId').notEmpty().withMessage('Item ID is required'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { itemId } = req.body;
    const user = req.user;

    try {
      user.cart = user.cart.filter(ci => ci.item.toString() !== itemId);
      await user.save();
      res.status(200).json({ message: 'Item removed from cart', cart: user.cart });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
];

// Get all items from cart
exports.getCart = [
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const user = req.user;

    try {
      res.status(200).json({ cart: user.cart });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
];

// Increase quantity
exports.increaseQuantity = [
  body('itemId').notEmpty().withMessage('Item ID is required'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { itemId } = req.body;
    const user = req.user;

    try {
      const itemInCart = user.cart.find(ci => ci.item.toString() === itemId);
      if (itemInCart) {
        itemInCart.quantity += 1;
        await user.save();
        res.status(200).json({ message: 'Quantity increased', cart: user.cart });
      } else {
        res.status(404).json({ message: 'Item not found in cart' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
];

// Decrease quantity
exports.decreaseQuantity = [
  body('itemId').notEmpty().withMessage('Item ID is required'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { itemId } = req.body;
    const user = req.user;

    try {
      const itemInCart = user.cart.find(ci => ci.item.toString() === itemId);
      if (itemInCart) {
        itemInCart.quantity -= 1;
        if (itemInCart.quantity <= 0) {
          user.cart = user.cart.filter(ci => ci.item.toString() !== itemId);
        }
        await user.save();
        res.status(200).json({ message: 'Quantity updated', cart: user.cart });
      } else {
        res.status(404).json({ message: 'Item not found in cart' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
];



// to order cart
exports.orderNow = [
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const user = req.user;
    const { totalPrice, totalDiscount, coupon } = req.body;

    if (!totalPrice || totalPrice < 0) {
      return res.status(400).json({ message: 'Invalid total amount' });
    }

    try {
      if (coupon) {
        const couponDoc = await Coupon.findOne({ discountCode : coupon, couponStatus: 0, requestStatus: 1 });
        if (couponDoc) {
          user.coupon = 0;
          couponDoc.couponStatus = 1;
          couponDoc.discountAmount = totalDiscount || 0;

          await couponDoc.save();
        } else {
          return res.status(400).json({ message: 'INVALID Coupon' });
        }
      }

      user.cart.forEach(entry => {
        user.orders.push(entry.item);
      });

      user.cart = [];
      user.orderCount += 1;
      user.totalPurchaseAmount += totalPrice;

      await user.save();

      return res.status(200).json({ message: 'Order placed successfully' });
    } catch (error) {
      console.error('Order error:', error.message);
      return res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
];

// get orders
exports.getOrders = [
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const user = req.user;

    try {
      res.status(200).json({ orders: user.orders });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
];
