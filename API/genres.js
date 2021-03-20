var express = require('express');
var router = express.Router();
var client = require("./elastic-client")
var config = require('./cfg.json');

router.get('/', (req, res) => {
    let data = client.search({
        index: config.indexName,
        body: {
            size: 0,
            aggregations: {
                genres: {
                    terms: {
                        field: "genres.keyword",
                        size: 1000
                    }
                }
            },
        }
    }, (err, data) => {
        return res.send(JSON.stringify(data));
    })
});

module.exports = router;