var dbName = 'playergame_db';
var collectionName = 'player';

var DB = require('mongodb').Db,
    Connection = require('mongodb').Connection,
    Server = require('mongodb').Server,
    BSON = require('mongodb').BSON,
    ObjectID = require('mongodb').ObjectID;

// Constructor. Creates and opens the DB connection
PlayerProvider = function(host, port) {
  this.db = new DB(dbName, new Server(host, port, {auto_reconnect: true}));
  this.db.open(function(error,db) {});
};

PlayerProvider.prototype.findAll = function(callback) {
  //access collection
  this.db.collection(collectionName, function(error, player_collection) {
    if(error) callback(error);
    else {
      //get everything out of it and return
      player_collection.find().toArray(function(error, results) {
        if(error) callback(error);
        else callback(null, results);
      });
    }
  });
};

PlayerProvider.prototype.findById = function(id, callback) {
  //access collection
  this.db.collection(collectionName, function(error, player_collection) {
    if(error) callback(error);
    else {
      //get only the one with a matching id
      player_collection.findOne({'_id': id}, function(error, player) {
        if(error) callback(error);
        else callback(null, player);
      });
    }
  });
};

PlayerProvider.prototype.seed = function(callback) {
  this.db.collection(collectionName, function(error, player_collection) {
    if(error) {
      callback(error);
      return;
    }
    
    //check to see if players already exist. access player collection
    player_collection.find().toArray(function(error, results) {
      if(error) {
        callback(error);
        return;
      }
      
      //if there are players, stop, otherwise, add hard-coded players
      if(results.length > 0) callback({"error":"Players already exist, can't call seed again"});
      else {
        var players = [
          {
            "_id": "adam",
            "name": "Adam Quinn",
            "score": 0
          },
          {
            "_id": "sam",
            "name": "Sam Brenner",
            "score": 0
          },
          {
            "_id": "xuedi",
            "name": "Xuedi Chen",
            "score": 0
          }
        ];

        console.log(players);

        player_collection.insert(players, function() {
          callback(null, players);
        });
      }
    });
  });
};

exports.PlayerProvider = PlayerProvider;