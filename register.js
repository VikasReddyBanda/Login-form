var express = require("express");
var app     = express();
var path    = require("path");
var mysql = require('mysql');
var session= require('express-session');
var bodyParser = require('body-parser');
var ejs=require('ejs');
var fs = require('fs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}));
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
	if(req.session.user=null){
		res.redirect('/');
	}else{
	
var nam=req.body.name;
var pass=req.body.password;
con.connect(function(err){
  if(err) throw err;
  var sql="select * from employee where username='"+nam+"' && password='"+pass+"'";
  con.query(sql,function (err,result) {
    if(result.length){
      req.session.user=result[0];
      res.render('content.ejs', {data:result}); 
    }else
    res.render('/');
 });
});
	};
});
app.get('/logout',function(req,res){
  
 req.session.destroy(function(err){
   res.redirect("/");
  });
});
app.post('/createaccount',function(req,res){
  res.sendFile(path.join(__dirname+'/createaccount.html'));
});
app.post('/csubmit',function(req,res){
var sq="select *from employee where email='"+req.body.email+"'";
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
    console.log(result[0]);  
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