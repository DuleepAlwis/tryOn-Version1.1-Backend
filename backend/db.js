var mongo = require('mongodb').MongoClient;

var url = "mongodb://localhost:27017/tryondb";

MongoClient.connect(url, function (err, db) {
  if (err) throw err;

})
