'use strict';
var express = require('express');
var router = express.Router();
var models = require('../models');
var nunjucks = require('nunjucks');
var Page = models.Page;
var User = models.User;


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
	
	var page = Page.build({
    title: req.body.title,
    content: req.body.content
	});

	page.save().then(function(savedPage){
		res.redirect(savedPage.address);
	})
	.catch(next);
});





module.exports = router;