exports.login = function (req, res) {
  var s = "user" in req.session;
  console.log(req.session);
  if (s) {
    res.render("login1.ejs", { message: "session expired" });
  } else {
    var message = "";
    if (req.method == "POST") {
      var nam = req.body.name;
      var pass = req.body.password;
      var sql =
        "select * from employee where username='" +
        nam +
        "' && password='" +
        pass +
        "'";
      db.query(sql, function (err, results) {
        if (results.length) {
          req.session.result = results;
          req.session.user = nam;
          req.session.password = pass;
          var sess = req.session.user;
          res.locals.res = res;
          // res.redirect("/login");
          // res.setHeader("Pragma", "no-cache");
          // res.setHeader("Expires", "0");
          // res.setHeader(
          //   "Cache-Control",
          //   "no-store, no-cache, max-age=0, must-revalidate, private"
          // );
          res.redirect("/login");
          // res.render("content.ejs", { sess: sess, data: results });
        } else {
          res.render("login1.ejs", { message: message });
        }
      });
    }
  }
};

/*----------------------------------Logout-----------------------------------------------*/

exports.logout = function (req, res) {
  req.session.destroy(function (err) {
    //res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    res.cookie();
    res.redirect("/");
  });
  console.log(req.session);
};

/*----------------------------------createaccount----------------------------------------*/
exports.createaccount = function (req, res) {
  if ((req.method = "POST")) {
    var Name = req.body.name;
    var Email = req.body.email;
    var Username = req.body.username;
    var Password = req.body.password;
    var sql =
      "INSERT INTO employee (name, email,username,password) VALUES ('" +
      Name +
      "', '" +
      Email +
      "','" +
      Username +
      "','" +
      Password +
      "')";
    db.query(sql, function (err, result) {
      message = "Succesfully! Your account has been created.";
      res.render("login1.ejs", { message: message });
    });
  } else {
    res.sendFile(path.join(__dirname + "/createaccount.html"));
  }
};
