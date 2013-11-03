/*
Instantiate new providers. Since we will use the player information to then gather highfive data,
we will need both.
*/
var PlayerProvider = require('../providers/PlayerProvider').PlayerProvider;
var playerProvider = new PlayerProvider('localhost', 27017);

var HighFiveProvider = require('../providers/HighFiveProvider').HighFiveProvider;
var highFiveProvider = new HighFiveProvider('localhost', 27017);

exports.findAll = function(req, res) {
  playerProvider.findAll(function(error, players) {
    var callbackCounter = 0;

    for(var i=0; i<players.length; i++) {
      addHighFiveDataTo(players[i], function() {
        callbackCounter++
        if(callbackCounter == players.length) res.send(players);
      });
    }
  });
};

exports.findById = function(req, res) {
  playerProvider.findById(req.params.id, function(error, player) {
    addHighFiveDataTo(player, function() {
      res.send(player);
    });
  });
};

exports.seed = function(req, res) {
  playerProvider.seed(function(error, players) {
    if(error) res.send(error);
    else res.send(players);
  });
};

function addHighFiveDataTo(player, callback) {
  highFiveProvider.findByPlayerName(player._id, function(error, highfives) {
    player.highfives = highfives;
    player.score = highfives.length; //this doesn't actually change anything on the db, i will figure out how to change that. probably will have to save highfives to the player on the db instead of two separate collections? i don't understand mongodb yet...
    callback();
  });
}

  