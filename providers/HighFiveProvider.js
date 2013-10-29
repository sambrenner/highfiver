var dbName = 'highfivegame_db';
var collectionName = 'highfives';

var DB = require('mongodb').Db,
    Connection = require('mongodb').Connection,
    Server = require('mongodb').Server,
    BSON = require('mongodb').BSON,
    ObjectID = require('mongodb').ObjectID;

// Constructor. Creates and opens the DB connection
HighFiveProvider = function(host, port) {
  this.db = new DB(dbName, new Server(host, port, {auto_reconnect: true}));
  this.db.open(function(error,db) {});
};

HighFiveProvider.prototype.findAll = function(callback) {
  //access collection
  this.db.collection(collectionName, function(error, highfive_collection) {
    if(error) callback(error);
    else {
      //get everything out of it and return
      highfive_collection.find().toArray(function(error, results) {
        if(error) callback(error);
        else callback(null, results);
      });
    }
  });
};

HighFiveProvider.prototype.findById = function(id, callback) {
  //access collection
  this.db.collection(collectionName, function(error, highfive_collection) {
    if(error) callback(error);
    else {
      //get only the one with a matching id
      highfive_collection.findOne({'_id': ObjectID(id)}, function(error, highfive) {
        if(error) callback(error);
        else callback(null, highfive);
      });
    }
  });
};

HighFiveProvider.prototype.save = function(highfives, callback) {
  //access collection
  this.db.collection(collectionName, function(error, highfive_collection) {
    if(error) callback(error);
    else {
      //highfives have been passed in from routes/highfives.js
      //convert them to an array if not already
      if(typeof(highfives.length)=='undefined') highfives = [highfives];

      //give them all the current date
      for(var i=0; i<highfives.length; i++) {
        highfives[i].created_at = new Date();
      }

      //add them to our collection
      highfive_collection.insert(highfives, function() {
        callback(null, highfives);
      });
    }
  });
};

exports.HighFiveProvider = HighFiveProvider;