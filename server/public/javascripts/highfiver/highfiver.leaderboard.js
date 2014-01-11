var highfiver = highfiver || {};

highfiver.leaderboard = (function(window,document) {
  var _socket,
      _topScore = 0,
      _happyFaces,
      _$container,
      _$players,
      _$runners,
      _$runnerOverlay,
      _$winnerOverlay,
      _$textMessages,
      _halfContainerHeight;

  var _cacheSelectors = function() {
    _happyFaces = {
      'adam': '/images/adam_happy.png',
      'sam': '/images/sam_happy.png',
      'xuedi': '/images/xuedi_happy.png'
    };

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

    _$runnerOverlay = $('#highfive_overlay');
    _$winnerOverlay = $('#winner_overlay');
    _$textMessages = $('#highfive_overlay .message');
    _$container = $('#main_content');
  };

  var _updateScoreFaces = function() {
    for(var player in _$players) {
      var $player = _$players[player];
      if(parseInt($player.find('.score').text()) == _topScore) $player.removeClass('sad').addClass('happy');
      else $player.removeClass('happy').addClass('sad');
    }
  };

  var _handleGameBegin = function() {
    _$runnerOverlay.removeClass('hidden');
  };

  var _handleGameOver = function(winner) {
    self.updateScores();
    _$runnerOverlay.addClass('hidden');
    _$winnerOverlay.removeClass('hidden').find('h1').text(winner);
    _$winnerOverlay.find('img').addClass('spin').attr('src', _happyFaces[winner]);

    setTimeout(function() {
      _hideTextMessages();
      _$winnerOverlay.addClass('hidden');
    }, 5000);
  };

  var _handleTextMessages = function(messages) {
    for(var key in messages) {
      if(key == 'status') continue;
      
      var message = messages[key];
      if(message != '') _$runners[key].find('.message').text(messages[key]).removeClass('hidden');
    }
  };

  var _hideTextMessages = function() {
    _$textMessages.empty().addClass('hidden');
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
          _handleGameOver(msg.win);
          break;
      }
    });
  };

  var _bindWindowResize = function() {
    _$container.css('position', 'absolute');
    _halfContainerHeight = _$container.height() / 2

    $(window).resize(function() {
      _$container.css('top', $(window).height() / 2 - _halfContainerHeight);
    });

    $(window).resize();
  };

  var self = {
    init: function() {
      _cacheSelectors();
      _initSocketIO();
      _bindWindowResize();
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
    },
    testGameBegin: function() {
      _handleGameBegin();
    },
    testGameEnd: function() {
      _handleGameOver('adam');
    },
    testTextMessages: function() {
      _handleTextMessages({"xuedi": "I'm on my way!"});
    }
  };

  return self;
})(this,this.document);

$(document).ready(function() {
  highfiver.leaderboard.init();
})