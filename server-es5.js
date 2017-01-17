'use strict';

var express = require('express');
var morgan = require('morgan');

var app = express();

var blogPostRouter = require('./blogPostRouter');

app.use(morgan('common'));

// when requests come into `/blogpost`, we'll route them to the express
// router instances we've imported. Remember,
// these router instances act as modular, mini-express apps.
app.use('/blogPostRouter', blogPostRouter);

app.listen(process.env.PORT || 8080, function () {
    console.log('Your app is listening on port ' + (process.env.PORT || 8080));
});
