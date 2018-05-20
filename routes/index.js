var express = require('express');
var router = express.Router();
var Product = require('../models/product');
var passport = require('passport');

//for csrf protection against session theft.
var csrf = require('csurf');

var csrfProtection = csrf();
router.use(csrfProtection);

/* GET home page. */
router.get('/', function(req, res, next) {

  // this method is necessary to avoid async nature and ensure this fires at the right time. 
  Product.find(function(err , docs) {

    // here we are diving all docs into an array productChunks whose each element is an array of chunckSize containing products in one row. 
    var productChunks = [];
    var chunckSize =3;

    for(var i =0 ; i< docs.length; i += chunckSize ) {
      productChunks.push(docs.slice(i, i + chunckSize ));
    }
    res.render('shop/index', { title: 'Shopping Cart', products: productChunks });
   
  });
  
});


router.get('/user/signup', function(req, res, next) {
  
  var messages = req.flash('error');
  res.render('user/signup', { csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length >0});

});


router.post('/user/signup', passport.authenticate('local.signup', {
  successRedirect: 'profile',
  failureRedirect: 'signup',
  failureFlash: true
})); 


router.get('/user/profile', function(req, res, next) {

  res.render('user/profile');

});

// function(req, res, next) {

//   // redirect user to the starting page.
//   // res.redirect('/');

// });


module.exports = router;
