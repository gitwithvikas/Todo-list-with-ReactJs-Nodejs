
const mysql = require('mysql2');


// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password:'Vikas@12345',
  database: 'todolist'
});


module.exports = connection;