'use strict';
var express = require('express');
var router = express.Router();
var models = require('../models');
var nunjucks = require('nunjucks');
var Page = models.Page;
var User = models.User;
// var Promise = require('bluebird');


router.get('/', function (req, res, next) {
	User.findAll()
	.then(function(users) {
		res.render('users', {users});
	})
	.catch(next);
})


router.get('/:id', function(req, res, next) {
	var userPromise = User.findById(req.params.id);
  var pagesPromise = Page.findAll({
    where: {
      authorId: req.params.id
    }
  });

  Promise.all([
    userPromise, 
    pagesPromise
  ])
  .then(function(values) {
    var user = values[0];
    var pages = values[1];
    res.render('author', { user: user, pages: pages });
  })
  .catch(next);
});

module.exports = router;