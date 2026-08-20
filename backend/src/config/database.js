// Import the MySQL2 package.
// The "/promise" version allows us to use async/await
// when communicating with the MySQL database.
const mysql = require('mysql2/promise');

// Load environment variables from the .env file.
require('dotenv').config();

// Create a connection pool for the MySQL database.
// A connection pool allows the application to reuse
// database connections instead of creating a new one
// for every request.
const pool = mysql.createPool({

    // The MySQL server is running on this computer.
    host: process.env.DB_HOST,

    // MySQL username.
    user: process.env.DB_USER,

    // MySQL password stored securely in .env.
    password: process.env.DB_PASSWORD,

    // The database used by our ICT Helpdesk System.
    database: process.env.DB_NAME,

    // Wait for a database connection to become available
    // if all connections are currently being used.
    waitForConnections: true,

    // Maximum number of database connections
    connectionLimit: Number(process.env.DB_CONNECTION_LIMIT),

    // 0 means there is no fixed limit on requests
    // waiting for a database connection.
    queueLimit: 0,
});

// Export the connection pool so other backend files,
// such as controllers, can communicate with MySQL.
module.exports = pool;