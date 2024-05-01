const Task = require('../models/task');

const taskController = {
    getAllTasks: (req, res) => {
        Task.getAllTasks((err, tasks) => {
            if (err) {
                res.status(500).json({ error: 'Internal server error' });
                return;
            }
            res.json(tasks);
        });
    },
    getTaskById: (req, res) => {
        const id = req.params.id;
        Task.getTaskById(id, (err, task) => {
            if (err) {
                res.status(500).json({ error: 'Internal server error' });
                return;
            }
            if (!task) {
                res.status(404).json({ error: 'Task not found' });
                return;
            }
            res.json(task);
        });
    },
    addTask: (req, res) => {
        const newTask = req.body;
        Task.addTask(newTask, (err, result) => {
            if (err) {
                res.status(500).json({ error: 'Internal server error' });
                return;
            }
            res.status(201).json({ message: 'Task added successfully' });
        });
    },
    updateTask: (req, res) => {
        const id = req.params.id;
        const updatedTask = req.body;
        Task.updateTask(id, updatedTask, (err, result) => {
            if (err) {
                res.status(500).json({ error: 'Internal server error' });
                return;
            }
            if (result.affectedRows === 0) {
                res.status(404).json({ error: 'Task not found' });
                return;
            }
            res.json({ message: 'Task updated successfully' });
        });
    },
    deleteTask: (req, res) => {
        const id = req.params.id;
        Task.deleteTask(id, (err, result) => {
            if (err) {
                res.status(500).json({ error: 'Internal server error' });
                return;
            }
            if (result.affectedRows === 0) {
                res.status(404).json({ error: 'Task not found' });
                return;
            }
            res.json({ message: 'Task deleted successfully' });
        });
    }
};

module.exports = taskController;
