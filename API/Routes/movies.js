var express = require('express');
var router = express.Router();
var client = require("../elastic-client")
var config = require('../cfg.json');


router.get('/', function (req, res) {
    let title = req.query.title;
    let rating = req.query.rating;
    let genre = req.query.genre;
    let country = req.query.country;
    let mustQueries = [];

    if (title) {
        mustQueries.push({ match: { title: title } })
    }

    if (country) {
        mustQueries.push({ match: { countries: country } })
    }

    if (genre) {
        mustQueries.push({ match: { genres: genre } })
    }

    if (rating) {
        mustQueries.push({ range: { rating: { gte: rating } } })
    }

    let data = client.search({
        index: config.indexName,
        body: {
            size: config.maxHits,
            query: { bool: { must: mustQueries } }
        }
    }, (err, data) => {
        return res.send(JSON.stringify(data));
    })

    // res.send('GET route on movies.');
});

router.get('/top', (req, res) => {
    let data = client.search({
        index: config.indexName,
        body: {
            sort: [
                { rating: { order: "desc", mode: "avg" } },
                { ratingCount: { order: "desc", mode: "avg" } }
            ],
            size: config.maxHits,
            query: { range: { ratingCount: { gte: 100000 } } }
        }
    }, (err, data) => {
        return res.send(JSON.stringify(data));
    })
});

router.get('/:id', function (req, res) {
    let id = req.params.id;
    let data = client.search({
        index: config.indexName,
        body: {
            size: config.maxHits,
            query: { match: { "_id": id } }
        }
    }, (err, data) => {
        return res.send(JSON.stringify(data));
    })
})



router.post('/', function (req, res) {
    res.send('POST route on movies.');
});

//export this router to use in our index.js
module.exports = router;