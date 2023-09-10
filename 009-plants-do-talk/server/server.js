var express = require('express');
var app = express();
var http = require('http').createServer(app);
var socketIO = require('socket.io')(http, {
    cors: {
        origin: "*"
    }
});

http.listen(3000, function(){
    console.log("socket server is running");
    // socketIO.on('connection', function(socket){
    //     socket.on('mouse', function(clientData){
    //         socket.broadcast.emit('mouse', clientData);
    //         console.log(clientData);
    //     });
    //     console.log('new connection ' + socket.id);
    // });
    socketIO.on('connection', function(socket){
        console.log(socket.id);
        socket.on('mouse', function(data){
            socket.broadcast.emit('mouse', data);
            console.log(data);
        })
    });
});

app.use(express.static('public'));

