// Import and require mysql2
const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: '#Bobeda#456secreta',
      database: 'employees_db'
    },
    console.log(`Connected to database.`)
  );

module.exports = db;