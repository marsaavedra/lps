var exports = module.exports = {}
 
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

exports.logout = function(req, res) {
 
    req.session.destroy(function(err) {
 
        res.redirect('/');
 
    });
 
}