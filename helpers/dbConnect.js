import env from 'dotenv';
env.config();
// Import and require mysql2
import sql from 'mysql2';

// Connect to database
const db = sql.createConnection(
    {
      host: 'localhost',
      user:  process.env.DB_USER,
      password: process.env.DB_PW,
      database: process.env.DB_NAME
    },
    console.log(`Connected to database.`)
  );

export default db;