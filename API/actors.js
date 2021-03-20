var express = require('express');
var router = express.Router();
var client = require("./elastic-client")
var config = require('./cfg.json');

router.get('/top', (req, res) => {
    let data = client.search({
        index: config.indexName,
        body: {
            size: 0,
            aggs: {
                actors: {
                    terms: {
                        field: "actors.name.keyword",
                        min_doc_count: 10,
                        order: {
                            "_count": "desc"
                        },
                        size: 100,
                    },
                    aggs: {
                        avg_rating: {
                            avg: {
                                field: "rating"
                            }
                        }
                    }
                }
            },
            query: {
                bool: {
                    must: [
                        { range: { releaseDate: { gte: "1990", lte: "2018", format: "dd-MM-yyyy" } } },
                        { range: { rating: { gte: 6 } } },
                        { range: { ratingCount: { gte: 10000 } } },
                        { range: { runTimeInMinutes: { gte: 30 } } }
                    ]
                }
            }
        }
    },
        (err, data) => {
            return res.send(JSON.stringify(data))
        })
});

module.exports = router;