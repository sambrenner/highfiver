var express = require('express'),
    routes = require('./routes'),
    highfives = require('./routes/highfives'),
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
app.get('/highfives', highfives.findAll);
app.get('/highfives/:id', highfives.findById);
app.post('/highfives/new', highfives.addNew);

// Start server
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});