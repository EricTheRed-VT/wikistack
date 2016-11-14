'use strict';
var express = require('express');
var router = express.Router();
var models = require('../models');
var nunjucks = require('nunjucks');
var Page = models.Page;
var User = models.User;
var Promise = require('bluebird');

router.get('/add', function(req, res, next){
	//retrieve "add page" form
	res.render('addpage');
});

router.get('/', function(req, res, next){
	//retrieve all pages
	Page.findAll()
	.then(function(pages){
		res.render('index', {pages});
	})
	.catch(next);
	
});

router.get('/:page', function(req, res, next) {
	Page.findOne({ 
    		where: { 
      		urlTitle: req.params.page 
    		} 
  	})
  	.then(function(foundPage){
    		res.render('wikipage', {foundPage});
  	})
  	.catch(next);
});

router.post('/', function(req, res, next){
	//submit new page
	User.findOrCreate({
  		where: {
    			name: req.body.author,
    			email: req.body.email
  		}
	})
	.then(function (values) {

  		var user = values[0];

  		var page = Page.build({
    			title: req.body.title,
		    content: req.body.content
		  });

		  return page.save().then(function (page) {
		    return page.setAuthor(user);
		  });

		})

		.then(function (page) {
		  res.redirect(page.address);
		})
		.catch(next);

});


module.exports = router;