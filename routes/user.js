exports.login=function(req,res){
    var message = '';
    if(req.method=="POST"){
        var nam=req.body.name;
        var pass=req.body.password;
        var sql="select * from employee where username='"+nam+"' && password='"+pass+"'";
        db.query(sql,function(err,results){
            if(results.length){
                req.session.user=results[0];
                var sess=req.session.user;
                res.locals.res = res;
                res.render('content.ejs',{sess:sess,data:results});
            }else{
                message = 'Wrong Credentials.';
                res.render('login1.ejs', { message: message });
            }
        });
    }else{
        res.render('index.ejs', { message: message });
    }
};
/*----------------------------------Logout-----------------------------------------------*/
exports.logout=function(req,res){
   
    req.session.destroy(function(err){
        //res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
        res.cookie();
        res.redirect("/");
    });
};
/*----------------------------------createaccount----------------------------------------*/
exports.createaccount=function(req,res){
    if(req.method="POST"){
        var Name=req.body.name;
  var Email=req.body.email;
  var Username=req.body.username;
  var Password=req.body.password;
  var sql = "INSERT INTO employee (name, email,username,password) VALUES ('"+Name+"', '"+Email+"','"+Username+"','"+Password+"')";
 db.query(sql,function(err,result){
    message = "Succesfully! Your account has been created.";
    res.render('login1.ejs', { message: message });
 });   
 }else{
    res.sendFile(path.join(__dirname+'/createaccount.html'));
 }
};  