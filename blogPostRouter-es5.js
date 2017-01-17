'use strict';

var _templateObject = _taggedTemplateLiteral(['(', ') must match'], ['(', ') must match']);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

var _require = require('./models'),
    BlogPosts = _require.BlogPosts;

BlogPosts.create('The best blog post', 'Here is where the best blog post should go', 'Patrick hubbard');
BlogPosts.create('tomatoes', 'this is a blog post all about tomatoes', 'Tomatoe Farmer');
BlogPosts.create('peppers', 'this is a blog post about them spicy peppers!', 'hot chillie lover');

router.get('/', function (req, res) {
    res.json(BlogPosts.get());
});

router.post('/', jsonParser, function (req, res) {
    var requiredFields = ['title', 'content', 'author'];
    for (var i = 0; i < requiredFields.length; i++) {
        var field = requiredFields[i];
        if (!(field in req.body)) {
            var message = 'Missing `' + field + '` in request body';
            console.error(message);
            return res.status(400).send(message);
        }
    }
    var item = BlogPostss.create(req.body.title, req.body.content, req.body.author, req.body.publishDate);
    res.status(201).json(item);
});

router.delete('/:id', function (req, res) {
    BlogPostss.delete(req.params.id);
    console.log('Deleted blog item `' + req.params.ID + '`');
    res.status(204).end();
});

router.put('/:id', jsonParser, function (req, res) {
    var requiredFields = ['title', 'content', 'author', 'publishDate', 'id'];
    for (var i = 0; i < requiredFields.length; i++) {
        var field = requiredFields[i];
        if (!(field in req.body)) {
            var message = 'Missing `' + field + '` in request body';
            console.error(message);
            return res.status(400).send(message);
        }
    }
    if (req.params.id !== req.body.id) {
        var _message = ('Request path id (' + req.params.id + ') and request body id ')(_templateObject, req.body.id);
        console.error(_message);
        return res.status(400).send(_message);
    }
    console.log('Updating blog item `' + req.params.id + '`');
    var updatedItem = BlogPostss.update({
        id: req.params.id,
        title: req.body.title,
        content: req.body.content,
        author: req.body.author,
        publishDate: req.body.publishDate
    });
    res.status(204).json(updatedItem);
});

module.exports = router;
