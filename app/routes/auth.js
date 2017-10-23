var authController = require('../controllers/authcontroller.js');
 
module.exports = function(app, passport) {
 
    app.get('/signup', authController.signup);

    app.get('/signin', authController.signin);

    // app.get('/dashboard',authController.dashboard);


    app.post('/signup', passport.authenticate('local-signup',  
    	{ successRedirect: '/dashboard',
          failureRedirect: '/signup'}
           ));

    app.get('/dashboard',isLoggedIn, authController.dashboard);

    app.get('/help',isLoggedIn, authController.help);

    app.get('/pig',isLoggedIn, authController.pig);

    app.get('/faqs',isLoggedIn, authController.faqs);


    app.post('/submission',isLoggedIn, authController.submission);

    app.get('/logout',authController.logout);

    app.post('/signin', passport.authenticate('local-signin', {
        successRedirect: '/dashboard',
 
        failureRedirect: '/signin'
    		}
 
		));

    function isLoggedIn(req, res, next) {
 
    if (req.isAuthenticated())
     
        return next();
         
    res.redirect('/signin');
 
}
 
}