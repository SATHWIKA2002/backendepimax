const mysql = require('mysql');
const config = require('../config/config');

const connection = mysql.createConnection(config.database);

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
        return;
    }
    console.log('Connected to MySQL database');
});
connection.query('SELECT * FROM users ', (err, rows) => {
    if (err) throw err;
    console.log(rows);
})

module.exports = connection;
