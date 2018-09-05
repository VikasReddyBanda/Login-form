var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database:"mydb"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql="create table employee(name varchar(255),password varchar(25),email varchar(255),username varchar(25))";
  con.query(sql,function(err,result){
      if(err) throw err;
      console.log("Table Created");
  });
});
//--------------------