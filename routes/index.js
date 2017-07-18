var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var assert = require('assert');
var url = 'mongodb://localhost:27017/demo';

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});
router.get('/get-data', function (req, res, next) {
    var resultArray = [];
    mongo.connect(url, function (err, db) {
        assert.equal(null, err);
        var cursor = db.collection('user-data').find();
        cursor.forEach(function (doc, err) {
            assert.equal(null, err);
            resultArray.push(doc);
        }, function () {
            db.close();
            console.log(resultArray);
            res.render('index', {item: resultArray, title: 'Express'});
        });
    })
})
router.post('/insert', function (req, res, next) {
    var item = {
        username: req.body.username,
        password: req.body.password,
        address: req.body.address,
    };
    mongo.connect(url, function (err, db) {
        assert.equal(null, err);
        db.collection('user-data').insertOne(item, function (err, result) {
            assert.equal(null, err);
            console.log('item is inserted');
            db.close();
        })
    })
    res.redirect('/');
});
router.post('/update', function (req, res, next) {

});

module.exports = router;
