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

 app.listen(3000);