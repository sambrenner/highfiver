var highfiver = highfiver || {};

highfiver.leaderboard = (function(window,document) {
  var _socket,
      _topScore = 0,
      _$players,
      _$runners,
      _$overlay,
      _$textMessages;

  var _cacheSelectors = function() {
    _$players = {
      'adam': $('#scores .adam'),
      'sam': $('#scores .sam'),
      'xuedi': $('#scores .xuedi')
    };

    _$runners = {
      'adam': $('#highfive_overlay .adam'),
      'sam': $('#highfive_overlay .sam'),
      'xuedi': $('#highfive_overlay .xuedi')
    };

    _$overlay = $('#highfive_overlay');
    _$textMessages = $('#highfive_overlay .message');
  };

  var _updateScoreFaces = function() {
    for(var player in _$players) {
      var $player = _$players[player];
      if(parseInt($player.find('.score').text()) == _topScore) $player.removeClass('sad').addClass('happy');
      else $player.removeClass('happy').addClass('sad');
    }
  };

  var _handleGameBegin = function() {
    _$overlay.removeClass('hidden');
  };

  var _handleGameEnd = function(winner) {
    self.updateScores(function() {
      _$overlay.addClass('hidden');
    });
  };

  var _handleTextMessages = function(messages) {
    for(var key in messages) {
      if(key == 'status') continue;
      
      var message = messages[key];
      if(message != '') _$runners[key].find('.message').text(messages[key]).removeClass('hidden');
    }
  };

  var _hideTextMessages = function() {
    _$textMessages.addClass('hidden');
  };

  var _initSocketIO = function() {
    _socket = io.connect('/');

    _socket.on('connect', function() {
      console.log('Connected to socket.io');
    });

    _socket.on('msg', function(msg) {
      console.log('Message received: ', msg);
      switch(msg.status) {
        case 0:
          _handleGameBegin();
          break;
        case 1:
          _handleTextMessages(msg);
          break;
        case 2:
          _handleGameOver(msg.winner);
          break;
      }
    });
  };

  var self = {
    init: function() {
      _cacheSelectors();
      _initSocketIO();
    },
    updateScores: function(callback) {
      $.ajax({
        url: '/players'
      }).done(function(data) {
        for (var i = 0; i < data.length; i++) {
          var player = data[i];
          if(player.score > _topScore) _topScore = player.score;
          _$players[player._id].find('.score').text(player.score);
        }

        _updateScoreFaces();

        if(callback) callback();
      });
    }
  };

  return self;
})(this,this.document);

$(document).ready(function() {
  highfiver.leaderboard.init();
})