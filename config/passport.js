var passport = require('passport');
var User  = require('../models/user');

var localStrategy = require('passport-local').Strategy;

// to store user in session.
passport.serializeUser(function (user, done) {
    // serialize user by id to store in session.
    done(null, user.id);
});

// to destore user.
passport.deserializeUser(function (id, done) {
    User.findById(id, function(err, user) {

        done(err, user);

    });
});


// create new local strategy for signup
passport.use('local.signup', new localStrategy( {

    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true

}, function( req, email, password, done) {

    User.findOne({'email': email}, function(err, user) {
        if(err) {
            return done(err);
        } 

        if(user) {
            return done(null, false, {message: 'E-Mail is already in use!!!'});
        }

        var newUser = new User();

        newUser.email = email;
        newUser.password = newUser.encryptPassword(password);
        newUser.save( function(err,result) {

            if(err) {
                return done(err);
            }
            return done(null, newUser);

        });
    });

}));

    