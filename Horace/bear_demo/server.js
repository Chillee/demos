var express = require('express');
var io = require('socket.io');
var path    = require("path");

var app = express();

app.use(express.static(__dirname + '/'));


app.get('/', function(req, res){
    res.sendFile(path.join(__dirname+'/bear.html'));
})

var server = app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

var listener = io.listen(server);
var players = 0;
listener.sockets.on('connection', function(socket){
    players++;
    console.log('connected');
    setInterval(function(){
        socket.emit('players', players);
    }, 100);
    socket.on('velocity', function(data){
        socket.broadcast.emit('playerVelocity', data);
    })
    socket.on('disconnect', function(){
        players--;
        console.log('disconnected');
    })

})

