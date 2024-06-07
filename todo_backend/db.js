const mysql = require('mysql')
const db = mysql.createConnection({
  host: 'localhost',
  user: 'hashir',
  password: '12345',
  database: 'todo'
})

db.connect((err) => {
  if (err) {
    console.error('Connection failed:', err.stack);
  } else {
    console.log('Connected to MySQL');

    // Set a timer to close the connection after 10 minutes
    setTimeout(() => {
      db.end((err) => {
        if (err) {
          console.error('Error closing the database connection:', err.stack);
        } else {
          console.log('Database connection closed after 10 minutes');
        }
      });
    }, 600000); // 600000 milliseconds = 10 minutes
  }
});
   
module.exports = db;