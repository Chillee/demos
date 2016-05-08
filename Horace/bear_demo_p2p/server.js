var express = require('express');
var path    = require("path");
var app = express();

var srv = app.listen(8000);

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname+'/bear.html'));
})
app.use(express.static(__dirname + '/'));
app.use('/peerjs', require('peer').ExpressPeerServer(srv, {
    debug: true
}));