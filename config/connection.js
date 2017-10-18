//Set the dependencies
var mysql = require("mysql");
var connection;

//Set up the connection to the database/Heroku
connection = mysql.createConnection({
  host: process.env.AWS_HOST || '127.0.0.1',
  user: process.env.AWS_USER || 'root',
  password: process.env.AWS_PASSWORD || 'root',
  port: process.env.AWS_PORT || 8889,
  database: process.env.AWS_DB || 'bringit'
    // host: '127.0.0.1',
    // user: 'root',
    // password: 'root',
    // port: 8889,
    // database: 'bringit'
    //
  });

//Connect to the database
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

module.exports = connection;
