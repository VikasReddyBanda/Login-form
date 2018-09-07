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

app.set("view engine", "html");

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "mydb"
});

con.connect();
global.db = con;

// app.get("/edit", function(req, res) {
//   if (req.session.user) {
//     res.sendFile(path.join(__dirname + "/createaccount.html"));
//   } else {
//     res.redirect("/");
//   }
// });

app.get("/", function(req, res) {
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
      }
    });
  } else {
    var message = " ";
    // res.redirect("/login2");
    res.setHeader(
      "Cache-Control",
      "no-store, no-cache, max-age=0, must-revalidate, private"
    );
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    res.render("login1.ejs", { message: message });
  }
});

app.get("/login2", (req, res) => {
  var s = "user" in req.session;
  if (s) {
    var results = req.session.result;
    var sess = req.session.user;
    // res.render("content.ejs", { sess: sess, data: results });
    res.redirect("/login");
  } else {
    var message = " ";
    // res.redirect("/login2");
    res.setHeader(
      "Cache-Control",
      "no-store, no-cache, max-age=0, must-revalidate, private"
    );
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    res.render("login1.ejs", { message: message });
  }
});

app.get("/login", (req, res) => {
  var s = "user" in req.session;
  if (s) {
    var sql =
      "select * from employee where username='" +
      req.session.user +
      "' && password='" +
      req.session.password +
      "'";
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

app.listen(5000);
console.log("Running at Port 5000");
