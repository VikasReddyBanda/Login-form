var express = require("express");
var app     = express();
var path    = require("path");
var mysql = require('mysql');
var bodyParser = require('body-parser');
var ejs=require('ejs');
var fs = require('fs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('view engine','html');
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "mydb"
});


app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/login1.html')); 
});
app.post('/lsubmit',function(req,res,next){
var nam=req.body.name;
var pass=req.body.password;

con.connect(function(err){
  if(err) throw err;
  var sql="select * from employee where username='"+nam+"' && password='"+pass+"'";
  con.query(sql,function (err,result) {
    if(err) throw err;
    
 res.render('content.ejs', {data:result});   
 });
});

});
app.post('/createaccount',function(req,res){
  res.sendFile(path.join(__dirname+'/createaccount.html'));
});
app.post('/csubmit',function(req,res){

  var Name=req.body.name;
  var Email=req.body.email;
  var Username=req.body.username;
  var Password=req.body.password;
 res.send('Account Created Successfully');
  con.connect(function(err) {
  if (err) throw err;
  var sql = "INSERT INTO employee (name, email,username,password) VALUES ('"+Name+"', '"+Email+"','"+Username+"','"+Password+"')";
  con.query(sql, function (err,result) {
    if (err) throw err;
    res.send('success');
    console.log(result);  
  });
  });

     /*res.write('You sent the name "' + Name+'".\n');
     res.write('You sent the email "' + Email+'".\n');
     res.write('You sent the username "' +Username+'".\n');
     res.write('You sent the password');*/
    
      res.end();
});
app.listen(3000);
console.log("Running at Port 3000");