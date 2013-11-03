var express = require('express'),
    routes = require('./routes'),
    players = require('./routes/players'),
    leaderboard = require('./routes/leaderboard'),
    http = require('http'),
    path = require('path');

var app = express();

// Configuration for all environments
app.configure(function() {
  app.set('port', process.env.PORT || 3000);
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

// Configuration for development only
app.configure('development', function(){
  app.use(express.errorHandler());
});

// Setup routes
app.get('/', routes.index);
app.get('/players', players.findAll);
app.get('/players/seed', players.seed);
app.get('/players/:id', players.findById);
app.get('/leaderboard', leaderboard.leaderboard);

app.post('/players/:id/highfives/add', players.addHighFive);

// Start server with socket.io
var server = http.createServer(app);
var io = require('socket.io').listen(server);

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

// socket.io events
io.sockets.on('connection', function(socket) {
  console.log('Socket Client Connected');
  io.sockets.emit('msg', 'we have a new friend!');

  socket.on('msg', function(msg) {
    socket.broadcast.emit('msg', msg);
  });
});