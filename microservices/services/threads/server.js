var express = require('express');
const db = require('./db.json');
var app = express();

app.get('/', function(req, res){
    res.send("Ready to receive requests");
});

app.get('/api/', function(req, res){
    res.send("API ready to receive requests");
});

app.get('/api/threads', function(req, res){
    res.send(db.threads);
});

app.get('/api/threads/:threadId', function(req, res){
    const id = parseInt(req.params.threadId);
    res.send(db.threads.find((thread) => thread.id == id));
});

app.listen(3000);