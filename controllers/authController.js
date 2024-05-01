const User = require('../models/user');

const authController = {
    login: (req, res) => {
        const { username, password } = req.body;
        User.authenticateUser(username, password, (err, token) => {
            if (err) {
                return res.status(500).json({ error: 'Internal server error' });
            }
            if (!token) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }
            res.json({ token });
        });
    },
    register: (req, res) => {
        const { username, password } = req.body;
        const newUser = { username, password };
        User.addUser(newUser, (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Internal server error' });
            }
            res.status(201).json({ message: 'User registered successfully' });
        });
    }
};

module.exports = authController;
