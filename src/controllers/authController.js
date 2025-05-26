const User = require('../models/User');
const jwt = require('jsonwebtoken');

const authController = {
    async register(req, res) {
        try {
            const { name, email, contact_number, password } = req.body;
            
 // Validate password is numeric and at least 6 digits
            if (!/^\d{6,}$/.test(password)) {
                return res.status(400).json({ error: 'Password must be numeric and at least 6 digits' });
            }

            const existingUser = await User.findByEmail(email);
            if (existingUser) {
                return res.status(400).json({ error: 'Email already registered' });
            }

            const user = await User.create({ name, email, contact_number, password });
            res.status(201).json({ message: 'Registration successful', user });
        } catch (error) {
            res.status(500).json({ error: 'Registration failed' });
        }
    },

    async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await User.findByEmail(email);
            
            if (!user) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            const token = jwt.sign(
                { userId: user.id, email: user.email },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            res.json({ 
                message: 'Login successful', 
                token,
                user: {
                    name: user.name,
                    email: user.email
                }
            });
        } catch (error) {
            res.status(500).json({ error: 'Login failed' });
        }
    },

    async getProfile(req, res) {
        try {
            const user = await User.findById(req.userId);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.json(user);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch profile' });
        }
    }
};

module.exports = authController;
