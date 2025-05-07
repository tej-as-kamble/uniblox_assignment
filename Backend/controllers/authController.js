const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');

exports.registerUser = [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password')
        .isLength({ min: 4 })
        .withMessage('Password must be at least 4 characters'),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        console.log(req.body);
        const { email, password, name } = req.body;

        try {
            let user = await User.findOne({ email });
            if (user) {
                return res.status(400).json({ message: 'Email already exists' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            user = new User({
                name,
                email,
                password: hashedPassword,
            });

            console.log(user);
            await user.save();

            res.status(201).json({ message: 'User created successfully', userId: user._id });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    }
];




exports.login = [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required'),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }

            const payload = { id: user._id, email: user.email };

            const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: '1d',
            });

            res.status(200).json({ token: accessToken });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    }
];
