var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {page:'Home', menuId:'home'});
});

router.get('/color', function(req, res, next) {
  res.render('color', {page:'Color', menuId:'color'});
});

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

module.exports = router;
