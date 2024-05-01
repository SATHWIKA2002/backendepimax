const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware.authenticateUser, taskController.getAllTasks);
router.get('/:id', authMiddleware.authenticateUser, taskController.getTaskById);
router.post('/', authMiddleware.authenticateUser, authMiddleware.authorizeAdmin, taskController.addTask);
router.put('/:id', authMiddleware.authenticateUser, authMiddleware.authorizeAdmin, taskController.updateTask);
router.delete('/:id', authMiddleware.authenticateUser, authMiddleware.authorizeAdmin, taskController.deleteTask);

module.exports = router;
