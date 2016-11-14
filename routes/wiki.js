'use strict';
var express = require('express');
var router = express.Router();

router.get('/add', function(req, res, next){
	//retrieve "add page" form
	res.render('addpage');
});

router.get('/', function(req, res, next){
	//retrieve all pages
	res.redirect('/');
});

router.post('/', function(req, res, next){
	//submit new page
	res.send('got to POST /wiki/');
});





module.exports = router;