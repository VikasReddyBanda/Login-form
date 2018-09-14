var express = require("express");
var app = express();
var path = require("path");
var mysql = require("mysql");
var session = require("express-session");
var bodyParser = require("body-parser");
var user = require("./routes/user");
var ejs = require("ejs");
var fs = require("fs");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
  })
);

<<<<<<< HEAD
app.set("view engine", "ejs");
=======
app.set("view engine", "html");
>>>>>>> cd19c926dace61c1b4068d2f1ec43f446af9c9d8

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "mydb"
});

con.connect();
global.db = con;
<<<<<<< HEAD

app.get("/edit/:id", function (req, res) {
  var id = req.params.id;
  //var sess=req.sess.user;
  // if (sess) {
  // var name=req.session.name;
  //var email=req.session.email;
  var sql = "select * from employee where id='" + id + "'";
  db.query(sql, function (err, result) {
    if (result.length) {
      var message = " ";
      res.render("edituser.ejs", { message: message, data: result });
      //res.sendFile(path.join(__dirname + "/createaccount.html"));
    } else {
      res.redirect("/");
    }
  });

  // } else {
  // res.redirect("/");
  // }
});

app.post("/updateuser/:id", function (req, res) {
  //var name=req.body.ename;
  var id = req.params.id;
  var name=req.body.ename;
  var email = req.body.eemail;
  var username = req.body.eusername;
  var password = req.body.epassword;
  var sql = "update employee set name='" + name + "', email='" + email + "',username='" + username + "',password='" + password + "' where id='" + id + "'";
  db.query(sql, function (err, result) {
    if (result) {
      var sql="select *from employee where id='"+req.params.id+"'";
      db.query(sql, function (err, result) {
      var message = "Sucessfully updated your details!"
      res.render("content.ejs", { data: result, message: message })
      });
    } else {
      var message = "please enter valid credentials!"
      res.render("edituser.ejs", { data: result, message: message })
    }
  });

});

app.get("/", function (req, res) {
=======

app.get("/edit", function(req, res) {
  if (req.session.user) {
    res.sendFile(path.join(__dirname + "/createaccount.html"));
  } else {
    res.redirect("/");
  }
});

app.get("/", function(req, res) {
>>>>>>> cd19c926dace61c1b4068d2f1ec43f446af9c9d8
  var s = "user" in req.session;
  if (s) {
    var results = req.session.result;
    var sess = req.session.user;
    res.end;
    console.log("========>", req.session);
    var sql =
      "select * from employee where username='" +
      req.session.user +
      "' && password='" +
      req.session.password +
      "'";
<<<<<<< HEAD
    db.query(sql, function (err, results) {
=======
    db.query(sql, function(err, results) {
>>>>>>> cd19c926dace61c1b4068d2f1ec43f446af9c9d8
      if (results.length) {
        var sess = req.session.user;
        res.locals.res = res;
        res.setHeader("Pragma", "no-cache");
        res.setHeader("Expires", "0");
        res.setHeader(
          "Cache-Control",
          "no-store, no-cache, max-age=0, must-revalidate, private"
        );
<<<<<<< HEAD
        res.render("content.ejs", { data: results });
=======
        res.render("content.ejs", { sess: sess, data: results });
>>>>>>> cd19c926dace61c1b4068d2f1ec43f446af9c9d8
      }
    });
  } else {
    var message = " ";
<<<<<<< HEAD
    // res.redirect("/login2");
=======

>>>>>>> cd19c926dace61c1b4068d2f1ec43f446af9c9d8
    res.setHeader(
      "Cache-Control",
      "no-store, no-cache, max-age=0, must-revalidate, private"
    );
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
<<<<<<< HEAD
    res.render("login1.ejs", { sess: sess, message: message });
  }
});

// app.get("/login2", (req, res) => {
//   var s = "user" in req.session;
//   if (s) {
//     var results = req.session.result;
//     var sess = req.session.user;
//     // res.render("content.ejs", { sess: sess, data: results });
//     res.redirect("/login");
//   } else {
//     var message = " ";
//     // res.redirect("/login2");
//     res.setHeader(
//       "Cache-Control",
//       "no-store, no-cache, max-age=0, must-revalidate, private"
//     );
//     res.setHeader("Pragma", "no-cache");
//     res.setHeader("Expires", "0");
//     res.render("login1.ejs", { message: message });
//   }
// });
=======
    res.render("login1.ejs", { message: message });
  }
});
>>>>>>> cd19c926dace61c1b4068d2f1ec43f446af9c9d8

app.get("/login", (req, res) => {
  var s = "user" in req.session;
  if (s) {
    var sql =
      "select * from employee where username='" +
      req.session.user +
      "' && password='" +
      req.session.password +
      "'";
<<<<<<< HEAD
    db.query(sql, function (err, results) {
      if (results.length) {

        res.locals.res = res;
        res.setHeader("Pragma", "no-cache");
        res.setHeader("Expires", "0");
        res.setHeader(
          "Cache-Control",
          "no-store, no-cache, max-age=0, must-revalidate, private"
        );
        var message = " ";
        res.render("content.ejs", { message: message, data: results });
      } else {
        var message = "failed";
        res.render("login1.ejs", { message: message });
      }
    });
  } else {
    var message = "please login again";
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    res.setHeader(
      "Cache-Control",
      "no-store, no-cache, max-age=0, must-revalidate, private"
    );
    res.render("login1.ejs", { message: message });
  }
});

app.post("/login", user.login);
app.get("/logout", user.logout);
app.post("/csubmit", user.createaccount);
//app.get("/csubmit", user.createaccount);
 app.get("/fasak",function(req,res){
 
   res.sendFile(path.join(__dirname + "/createaccount.html"));
 });
=======
    db.query(sql, function(err, results) {
      if (results.length) {
        var sess = req.session.user;
        res.locals.res = res;
        res.setHeader("Pragma", "no-cache");
        res.setHeader("Expires", "0");
        res.setHeader(
          "Cache-Control",
          "no-store, no-cache, max-age=0, must-revalidate, private"
        );
        res.render("content.ejs", { sess: sess, data: results });
      } else {
        var message = "failed";
        res.render("login1.ejs", { message: message });
      }
    });
  } else {
    var message = "session failed";
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    res.setHeader(
      "Cache-Control",
      "no-store, no-cache, max-age=0, must-revalidate, private"
    );
    res.render("login1.ejs", { message: message });
  }
});

app.post("/login", user.login);
app.get("/logout", user.logout);
app.post("/createaccount", user.createaccount);
>>>>>>> cd19c926dace61c1b4068d2f1ec43f446af9c9d8

app.listen(5000);
console.log("Running at Port 5000");
