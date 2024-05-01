const db = require('../db/connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

const User = {
    getAllUsers: (callback) => {
        return db.query('SELECT * FROM Users', callback);
    },
    getUserById: (id, callback) => {
        return db.query('SELECT * FROM Users WHERE id = ?', [id], callback);
    },
    addUser: (user, callback) => {
        bcrypt.hash(user.password, 10, (err, hash) => {
            if (err) {
                return callback(err);
            }
            return db.query('INSERT INTO Users(username, password_hash) VALUES(?, ?)', [user.username, hash], callback);
        });
    },
    authenticateUser: (username, password, callback) => {
        db.get('SELECT * FROM Users WHERE username = ?', [username], (err, user) => {
            if (err) {
                return callback(err);
            }
            if (!user) {
                return callback(null, null);
            }
            bcrypt.compare(password, user.password_hash, (err, result) => {
                if (err) {
                    return callback(err);
                }
                if (!result) {
                    return callback(null, null);
                }
                const token = jwt.sign({ id: user.id, username: user.username }, config.jwtSecret);
                return callback(null, token);
            });
        });
    }
};

module.exports = User;
