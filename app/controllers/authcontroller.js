var exports = module.exports = {}
var models = require("../models");
var nodemailer = require('nodemailer');

 
exports.signup = function(req, res) {
 
    res.render('signup');
 
}

exports.signin = function(req, res) {
 
    res.render('signin');
 
}

exports.dashboard = function(req, res) {
 
    res.render('dashboard');
 
}

exports.help = function(req, res) {
 
    res.render('help');
 
}

exports.pig = function(req, res) {
 
    res.render('pig');
 
}

exports.faqs = function(req, res) {
 
    res.render('faqs');
 
}

exports.submission = function(req, res, done) {


 	console.log("console ID", req.user.id);
    // res.render('bmission');
    var data = {
        Name : req.body.Name,
        Email : req.body.Email,
        Message : req.body.Message,
        userId : req.user.id
    };

    models.Submissions.create(data).then(function(newSubmission, created) {

        let transporter = nodemailer.createTransport({
          service: 'gmail',
          secure: false,
          port: 25,
          auth: {
            user: 'mytesting1991@gmail.com',
            pass: 'Dragon1991'
          },
          tls: {
            rejectUnauthorized: false
          }
        });
      //Mail options
      let HelperOptions = {
          from: req.body.Name + ' &lt;' + req.body.Email + '&gt;', //grab form data from the request body object
          to: 'mytesting1991@gmail.com',
          subject: 'Help Submission Form',
          text: req.body.Message+"\n" + "From:" +req.body.Name +"\n"+ "Email:" +" "+ req.body.Email +"\n"+ "Ticket: " + newSubmission.id
      };

      // console.log("ticket", req.user.id.submissions.id);

      transporter.sendMail(HelperOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log("The message was sent!");
        console.log(info);
      });


      res.render('submission',{data: newSubmission});


    });

    
 
}

exports.getAllSubmissions = function(req,res,done){
    //search through submissions and load up where user.id = req.user.id
    db.Submissions.findAll({
        where: {userId: req.user.id }
    }).then(function(data){
        console.log("data", data);
        res.send(data);
    }) 
}

exports.logout = function(req, res) {
 
    req.session.destroy(function(err) {
 
        res.redirect('/');
 
    });
 
}