var mysql = require('mysql');
/* creating my sql connection*/
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "dsd"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
