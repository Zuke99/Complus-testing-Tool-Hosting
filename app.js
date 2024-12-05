const express = require('express');
const mysql = require('mysql2');
const cors = require("cors");
const path = require('path');


// Initialize the app
const app = express();
const port = 8080;

const dbRoutes = require('./routes/dbRoutes');

// Create a MySQL connection pool
const db = mysql.createPool({
  host: 'sql12.freemysqlhosting.net',  // or your MySQL server IP
  user: 'sql12750042',       // your MySQL username
  password: 'pMSeAqpjUF',  // your MySQL password
  database: 'sql12750042'  // your database name
});
app.use(cors());
app.use(express.json());
app.use('/db', dbRoutes);

// Add static file serving and catch-all route BEFORE database connection check
app.use(express.static(path.join(__dirname,'build')));
app.get('*', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, 'build') });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

// Database connection check
db.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to the database:', err.message);
      return;
    }
    console.log('Database connected successfully!');
    connection.release();
});

  
