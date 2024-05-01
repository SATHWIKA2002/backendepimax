const db = require('../db/connection');

const Task = {
    getAllTasks: (callback) => {
        return db.query('SELECT * FROM Tasks', callback);
    },
    getTaskById: (id, callback) => {
        return db.query('SELECT * FROM Tasks WHERE id = ?', [id], callback);
    },
    addTask: (task, callback) => {
        return db.query('INSERT INTO Tasks(title, description, status, assignee_id) VALUES(?, ?, ?, ?)', [task.title, task.description, task.status, task.assignee_id], callback);
    },
    updateTask: (id, task, callback) => {
        return db.query('UPDATE Tasks SET title = ?, description = ?, status = ?, assignee_id = ? WHERE id = ?', [task.title, task.description, task.status, task.assignee_id, id], callback);
    },
    deleteTask: (id, callback) => {
        return db.query('DELETE FROM Tasks WHERE id = ?', [id], callback);
    }
};

module.exports = Task;
