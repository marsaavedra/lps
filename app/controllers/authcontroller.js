var exports = module.exports = {}
var models = require("../models");

 
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
 
                        if (!newSubmission) {
 
                            return done(null, false);
 
                        }
 
                        if (newSubmission) {
 
                            return done(null, newSubmission);
 
                        }
 
                    });

    res.render('submission');
 
}
exports.logout = function(req, res) {
 
    req.session.destroy(function(err) {
 
        res.redirect('/');
 
    });
 
}