var exports = module.exports = {}
var models = require("../models");
//npm package that allows our stack to send an email notification
var nodemailer = require('nodemailer');

 //rendering hbs files
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

exports.sdk = function(req, res) {
 
    res.render('sdk');
 
}

exports.firmware = function(req, res) {
 
    res.render('firmware');
 
}

exports.sampledata = function(req, res) {
 
    res.render('sampledata');
 
}

exports.submission = function(req, res, done) {


 	console.log("console ID", req.user.id);
    //data object with user parameters
    var data = {
        Name : req.body.Name,
        Email : req.body.Email,
        Message : req.body.Message,
        userId : req.user.id
    };

    models.Submissions.create(data).then(function(newSubmission, created) {
        // from whom the email is coming from
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
      //Body of email message
      let HelperOptions = {
          from: req.body.Name + ' &lt;' + req.body.Email + '&gt;', //grab form data from the request body object
          to: 'mytesting1991@gmail.com',
          subject: 'Help Submission Form',
          text: req.body.Message+"\n" + "From:" +req.body.Name +"\n"+ "Email:" +" "+ req.body.Email +"\n"+ "Ticket: " + newSubmission.id
      };

      //sends mail

      transporter.sendMail(HelperOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log("The message was sent!");
        console.log(info);
      });

      //rendering our submsission file to contain our new data submission entered in our form and stored in our database
      res.render('submission',{data: newSubmission});


    });

    
 
}

exports.getAllSubmissions = function(req,res,done){
    //search through submissions and load up where user.id = req.user.id which is our foreign key that connects to our child table or our submissions table. 
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