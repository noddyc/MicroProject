var express = require('express');
const db = require('./db.json');
var app = express();

app.get('/', function(req, res){
    res.send("Ready to receive requests");
 });

 app.get('/api/', function(req, res){
    res.send("API ready to receive requests");
 });

app.get('/api/users', function(req, res){
   res.send(db.users);
});

app.get('/api/users/:userId', function(req, res){
    const id = parseInt(req.params.userId);
    res.send(db.users.find((user) => user.id == id));
});

app.get('/api/users/:userId', function(req, res){
    const id = parseInt(req.params.userId);
    res.send(db.users.find((user) => user.id == id));
});

app.get('/api/threads', function(req, res){
    res.send(db.threads);
});

app.get('/api/threads/:threadId', function(req, res){
    const id = parseInt(req.params.threadId);
    res.send(db.threads.find((thread) => thread.id == id));
});

app.get('/api/posts/in-thread/:threadId', function(req, res){
    const id = parseInt(req.params.threadId);
    res.send(db.posts.filter((post) => post.thread == id));
});

app.get('/api/posts/by-user/:userId', function(req, res){
    const id = parseInt(req.params.userId);
    res.send(db.posts.find((post) => post.user == id));
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