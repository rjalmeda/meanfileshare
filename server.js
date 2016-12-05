var express = require('express');
var bp = require('body-parser');
var path = require('path');
var session = require('express-session');
var app = express();
var serverport = 8000;


app.use(bp.json());
app.use(express.static(path.join(__dirname, 'bower_components')));
app.use(express.static(path.join(__dirname, 'client')));

app.use(session({
    secret: 'timberdog',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false}
}));

require('./server/config/mongoose.js');
require('./server/config/routes.js')(app);

var server = app.listen(serverport, function(){
    console.log(`Listening on port ${serverport}`);
});

var io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket){
    console.log(`You are connected, SocketID ${socket.id}`);
    
    socket.on('initialize', function(data){
        if(data.connected){
            console.log(data);
            socket.emit(`serverresponse` ({connected: true, message: 'You are online and connected with socket'}));
        }
    })
});

