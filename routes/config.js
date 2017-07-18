var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/demo', function (err, db) {
    if (err) throw err



});