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
                directors: {
                    terms: {
                        field: "directors.keyword",
                        size: 100
                    },
                    aggs: {
                        avg_gross: {
                            avg: {
                                field: "gross"
                            }
                        },
                        gross_bucket_filter: {
                            bucket_selector: {
                                buckets_path: {
                                    avgGross: "avg_gross"
                                },
                                script: "params.avgGross > 10000000"
                            }
                        },
                        avg_gross_bucket_sort: {
                            bucket_sort: {
                                sort: [
                                    {
                                        avg_gross: {
                                            order: "desc"
                                        }
                                    }
                                ]
                            }
                        }
                    }
                }
            }
        }
    }, (err, data) => { return res.send(JSON.stringify(data)) })
});


module.exports = router;