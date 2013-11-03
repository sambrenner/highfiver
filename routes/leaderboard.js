var mongoUri = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/highfiver';

var PlayerProvider = require('../providers/PlayerProvider').PlayerProvider;
var playerProvider = new PlayerProvider(mongoUri);

exports.leaderboard = function(req,res) {
  playerProvider.findAll(function(error, players) {
    res.render('leaderboard', {players: players});
  });
};