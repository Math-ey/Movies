var express = require('express');
var router = express.Router();
var client = require("../elastic-client")
var config = require('../cfg.json');


router.get('/', (req, res) => {
    const title = req.query.title;
    const rating = req.query.rating;
    const genre = req.query.genre;
    const country = req.query.country;
    const page = req.query.page && req.query.page >= 0 ? req.query.page : 0;
    const limit = req.query.limit || config.maxHits;

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
            size: limit,
            from: page * limit,
            query: { bool: { must: mustQueries } }
        }
    }, (err, data) => {
        return res.send(JSON.stringify(data));
    })
});

router.get('/top', (req, res) => {
    const page = req.query.page && req.query.page >= 0 ? req.query.page : 0;
    const limit = req.query.limit || 25;
    let data = client.search({
        index: config.indexName,
        body: {
            sort: [
                { rating: { order: "desc", mode: "avg" } },
                { ratingCount: { order: "desc", mode: "avg" } }
            ],
            size: limit,
            from: page * limit, 
            query: { range: { ratingCount: { gte: 100000 } } }
        }
    }, (err, data) => {
        return res.send(JSON.stringify(data));
    })
});

router.get('/:id', (req, res) => {
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



router.post('/', (req, res) => {
    res.send('POST route on movies.');
});

//export this router to use in our index.js
module.exports = router;