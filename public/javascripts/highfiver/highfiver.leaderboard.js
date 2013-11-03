var highfiver = highfiver || {};

highfiver.leaderboard = (function(window,document) {
  var _socket;

  var _initSocketIO = function() {
    _socket = io.connect('/');

    _socket.on('connect', function() {
      console.log('Connected to socket.io');
    });

    _socket.on('msg', function(msg) {
      console.log('Message received: ' + msg);
    });
  };

  var self = {
    init: function() {
      _initSocketIO();
    }
  };

  return self;
})(this,this.document);

$(document).ready(function() {
  highfiver.leaderboard.init();
})