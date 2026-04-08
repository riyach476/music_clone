// db.js
const mysql =require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',  // default XAMPP password
    database: 'music_db'
});

module.exports = pool.promise();