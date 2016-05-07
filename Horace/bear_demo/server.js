var express = require('express');
var io = require('socket.io');
var path    = require("path");

var app = express();

app.use(express.static(__dirname + '/'));


app.get('/', function(req, res){
    console.log(path.join(__dirname+'/bear.html'));
    res.sendFile(path.join(__dirname+'/bear.html'));
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});