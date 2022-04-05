var express = require('express');
const db = require('./db.json');
var app = express();

app.get('/', function(req, res){
    res.send("Ready to receive requests");
});

app.get('/api/', function(req, res){
    res.send("API ready to receive requests");
});

app.get('/api/posts', function(req, res){
    res.send(db.posts);
});

app.get('/api/posts/in-thread/:threadId', function(req, res){
    const id = parseInt(req.params.threadId);
    res.send(db.posts.filter((post) => post.thread == id));
});

app.get('/api/posts/by-user/:userId', function(req, res){
    const id = parseInt(req.params.userId);
    res.send(db.posts.find((post) => post.user == id));
});

app.listen(3000);