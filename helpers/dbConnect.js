// Import and require mysql2
import sql from 'mysql2';

// Connect to database
const db = sql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: '#Bobeda#456secreta',
      database: 'employees_db'
    },
    console.log(`Connected to database.`)
  );

export default db;