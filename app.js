'use strict';
//setup requires
var express = require('express');
var morgan = require('morgan');
var nunjucks = require('nunjucks');
// var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');
var models = require('./models');


//setup express
var app = express();
app.use(express.static('public'))
app.use(express.static('views'))

//setup port in and postgres
// const port = 3000;

var usersSync = models.User.sync({ force: true })
var pagesSync = models.Page.sync({ force: true })

Promise.all([
	usersSync,
	pagesSync
	])
.then(function () {
    app.listen(3000, function () {
        console.log('Server is listening on port 3000!');
    });
})
.catch(console.error);


//setup nunjucks
var env = nunjucks.configure('views', {noCache: true});
app.set('view engine', 'html');
app.engine('html', nunjucks.render);

// setup bodyparser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//setup router
var wikiRouter = require('./routes/wiki');
app.use('/wiki', wikiRouter);

var usersRouter = require('./routes/users');
app.use('/users', usersRouter);



