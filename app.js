var express      = require('express');
var app          = express();
var cfenv        = require("cfenv");
var appEnv       = cfenv.getAppEnv();
var request      = require('request');
var validToken   = "1d914750-d8bc-0133-6ff8-16878d48352d";
var invalidToken = "invalid token";
var services     = appEnv.getServices();
// var dbUri        = services.graphql_registration_db.credentials.uri
var dbUri        = 'mongodb://127.0.0.1:27017/test';
var MongoClient  = require('mongodb').MongoClient;
var assert       = require('assert');
// var ObjectId     = require('mongodb').ObjectID;


app.get('/db_uri', function(req, res) {
  res.send(dbUri);
});

app.get('/show_all_teams', function(req, res) {
  MongoClient.connect(dbUri, function(err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to mongodb server.");

    var cursor = db.collection('teams').find();
    cursor.each(function(err, doc) {
      assert.equal(err, null);
      if (doc != null) {
         res.send(doc);
      }
    });
  });
});

// need to change this into an independent method that RETURNS true or false, then call it from an app.get to display true or false to the screen

app.get('/is_token_present', function(req, res) {
  MongoClient.connect(dbUri, function(err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to mongodb server.");

    var query = db.collection('teams').find( { "token" : validToken } )
    
    query.count(function(err, count) {
      if(err) {
        console.log(err);
      }
      console.log("COUNT:")
      console.log(count);
      // I think it's safe to assume the token will always be unique in the database
      if (count == 1) {
        console.log("true");
        res.send("true");
      } else if (count == 0) {
        console.log("false");
        res.send("false");
      }
    });
  });
});

// app.get('/invalid_token', function(req, res) {
//   MongoClient.connect(dbUri, function(err, db) {
//     assert.equal(null, err);
//     console.log("Connected correctly to mongodb server.");

//     var cursor = db.collection('teams').find( { "token" : invalidToken } );
//     cursor.each(function(err, doc) {
//       assert.equal(err, null);
//       if (doc != null) {
//          res.send("false");
//       }
//     });
//   });
// });


app.listen(process.env.PORT || 3000);