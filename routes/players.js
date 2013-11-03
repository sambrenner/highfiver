/*
Instantiate new providers. Since we will use the player information to then gather highfive data,
we will need both.
*/
var mongoUri = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/highfiver';

var PlayerProvider = require('../providers/PlayerProvider').PlayerProvider;
var playerProvider = new PlayerProvider(mongoUri);

exports.findAll = function(req, res) {
  playerProvider.findAll(function(error, players) {
    res.send(players);
  });
};

exports.findById = function(req, res) {
  playerProvider.findById(req.params.id, function(error, player) {
    res.send(player);
  });
};

exports.seed = function(req, res) {
  playerProvider.seed(function(error, players) {
    if(error) res.send(error);
    else res.send(players);
  });
};

exports.addHighFive = function(req, res) {
  playerProvider.addHighFive(req.params.id, req.body, function(error, highfives) {
    if(error) res.send(error);
    else res.send('{"success": "' + highfives + ' highfive(s) added" }');
  });
};

  