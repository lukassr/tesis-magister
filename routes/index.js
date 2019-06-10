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

router.get('/swipeType', function(req, res, next) {
  res.render('swipeType', {page:'type', menuId:'swipe'});
});

router.get('/traslucentType', function(req, res, next) {
  res.render('traslucentType', {page:'type', menuId:'traslucent'});
});

router.get('/magicLenseType', function(req, res, next) {
  res.render('magicLenseType', {page:'type', menuId:'magicLense'});
});

router.get('/juxtaposeType', function(req, res, next) {
  res.render('juxtaposeType', {page:'type', menuId:'yuxtapose'});
});

// BRAND

router.get('/staticBrand', function(req, res, next) {
  res.render('staticBrand', {page:'staticBrand', menuId:'static'});
});

router.get('/swipeBrand', function(req, res, next) {
  res.render('swipeBrand', {page:'brand', menuId:'swipe'});
});

router.get('/traslucentBrand', function(req, res, next) {
  res.render('traslucentBrand', {page:'brand', menuId:'traslucent'});
});

router.get('/magicLenseBrand', function(req, res, next) {
  res.render('magicLenseBrand', {page:'brand', menuId:'magicLense'});
});

router.get('/juxtaposeBrand', function(req, res, next) {
  res.render('juxtaposeBrand', {page:'brand', menuId:'yuxtapose'});
});

module.exports = router;
