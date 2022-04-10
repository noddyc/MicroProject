var express = require('express');
const db = require('./db.json');
var app = express();

app.get('/', function(req, res){
    res.send("Ready to receive requests");
});

app.get('/api/', function(req, res){
    res.send("API ready to receive requests");
});

app.get('/api/newservice', function(req, res){
    res.send(db.newservice);
 });
 

app.listen(3000);