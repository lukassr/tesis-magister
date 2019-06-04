var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {page:'Home', menuId:'home'});
});


// YEAR
router.get('/staticYear', function(req, res, next) {
  res.render('staticYear', {page:'staticYear', menuId:'static'});
});

router.get('/swipeYear', function(req, res, next) {
  res.render('swipeYear', {page:'year', menuId:'swipe'});
});

router.get('/traslucentYear', function(req, res, next) {
  res.render('traslucentYear', {page:'year', menuId:'traslucent'});
});

router.get('/magicLenseYear', function(req, res, next) {
  res.render('magicLenseYear', {page:'year', menuId:'magicLense'});
});

router.get('/juxtaposeYear', function(req, res, next) {
  res.render('juxtaposeYear', {page:'year', menuId:'yuxtapose'});
});

// COLOR
router.get('/staticColor', function(req, res, next) {
  res.render('staticColor', {page:'staticColor', menuId:'static'});
});

router.get('/swipeColor', function(req, res, next) {
  res.render('swipeColor', {page:'color', menuId:'swipe'});
});

router.get('/traslucentColor', function(req, res, next) {
  res.render('traslucentColor', {page:'color', menuId:'traslucent'});
});

router.get('/magicLenseColor', function(req, res, next) {
  res.render('magicLenseColor', {page:'color', menuId:'magicLense'});
});

router.get('/juxtaposeColor', function(req, res, next) {
  res.render('juxtaposeColor', {page:'color', menuId:'yuxtapose'});
});

// TYPE
router.get('/staticType', function(req, res, next) {
  res.render('staticType', {page:'staticType', menuId:'static'});
});




// BRAND
router.get('/staticBrand', function(req, res, next) {
  res.render('staticBrand', {page:'staticBrand', menuId:'static'});
});


module.exports = router;
