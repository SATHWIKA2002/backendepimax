const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware.authenticateUser, authMiddleware.authorizeAdmin, userController.getAllUsers);
router.get('/:id', authMiddleware.authenticateUser, userController.getUserById);
router.post('/', authMiddleware.authenticateUser, authMiddleware.authorizeAdmin, userController.addUser);
router.put('/:id', authMiddleware.authenticateUser, userController.updateUser);
router.delete('/:id', authMiddleware.authenticateUser, authMiddleware.authorizeAdmin, userController.deleteUser);

module.exports = router;
