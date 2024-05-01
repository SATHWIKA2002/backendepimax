const User = require('../models/user');

const userController = {
    getAllUsers: (req, res) => {
        User.getAllUsers((err, users) => {
            if (err) {
                res.status(500).json({ error: 'Internal server error' });
                return;
            }
            res.json(users);
        });
    },
    getUserById: (req, res) => {
        const id = req.params.id;
        User.getUserById(id, (err, user) => {
            if (err) {
                res.status(500).json({ error: 'Internal server error' });
                return;
            }
            if (!user) {
                res.status(404).json({ error: 'User not found' });
                return;
            }
            res.json(user);
        });
    },
    addUser: (req, res) => {
        const newUser = req.body;
        User.addUser(newUser, (err, result) => {
            if (err) {
                res.status(500).json({ error: 'Internal server error' });
                return;
            }
            res.status(201).json({ message: 'User added successfully' });
        });
    },
    updateUser: (req, res) => {
        const id = req.params.id;
        const updatedUser = req.body;
        User.updateUser(id, updatedUser, (err, result) => {
            if (err) {
                res.status(500).json({ error: 'Internal server error' });
                return;
            }
            if (result.affectedRows === 0) {
                res.status(404).json({ error: 'User not found' });
                return;
            }
            res.json({ message: 'User updated successfully' });
        });
    },
    deleteUser: (req, res) => {
        const id = req.params.id;
        User.deleteUser(id, (err, result) => {
            if (err) {
                res.status(500).json({ error: 'Internal server error' });
                return;
            }
            if (result.affectedRows === 0) {
                res.status(404).json({ error: 'User not found' });
                return;
            }
            res.json({ message: 'User deleted successfully' });
        });
    }
};

module.exports = userController;
