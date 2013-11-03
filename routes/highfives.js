/*
Instantiate new HighFiveProvider. HighFiveProvider communicates between our
app and the database.
*/
var mongoUri = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/highfivegame_db';

var HighFiveProvider = require('../providers/HighFiveProvider').HighFiveProvider;
var highFiveProvider = new HighFiveProvider(mongoUri);

exports.findAll = function(req, res) {
  highFiveProvider.findAll(function(error, highfives) {
    res.send(highfives);
  });
};

exports.findById = function(req, res) {
  highFiveProvider.findById(req.params.id, function(error, highfive) {
    res.send(highfive);
  });
};

exports.addNew = function(req, res) {
  highFiveProvider.save(req.body, function(error, highfives) {
    if(error) res.send({'error': 'An error has occurred'});
    else res.send(highfives);
  })
};


  