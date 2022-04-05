var express = require('express');
const db = require('./db.json');
var app = express();

app.get('/', function(req, res){
    res.send("Ready to receive requests");
});

app.get('/api/', function(req, res){
    res.send("API ready to receive requests");
});

app.get('/api/comments', function(req, res){
    res.send(db.comments);
});

app.get('/api/comments/by-user/:userId', function(req, res){
    const id = parseInt(req.params.userId);
    res.send(db.comments.find((comment) => comment.user == id));
});

app.get('/api/comments/in-post/:postId', function(req, res){
    const id = parseInt(req.params.postId);
    res.send(db.comments.find((comment) => comment.post == id));
});

app.listen(3000);