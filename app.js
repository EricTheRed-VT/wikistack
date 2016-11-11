'use strict';
//setup requires
var express = require('express');
var morgan = require('morgan');
var nunjucks = require('nunjucks');
var makesRouter = require('./routes');
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');

//setup express
var app = express();
app.use(express.static('public'))
app.use(express.static('views'))

//setup port
const port = 3000;
app.listen(3000);

//setup nunjucks
var env = nunjucks.configure('views', {noCache: true});
app.set('view engine', 'html');
app.engine('html', nunjucks.render);

//setup bodyparser
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

//setup router
app.use('/', routes);

