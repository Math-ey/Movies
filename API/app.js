const express = require('express')
const elasticsearch = require('elasticsearch')
const bodyParser = require('body-parser');
const app = express()
const port = 3000
app.use(bodyParser.json());
var client = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'trace'
})

app.get('/api', (req, res) => {
    res.send('Hello World!')
});

app.get('/api/searchByTitle', (req, res) => {
    let param = req.query.searchValue;
    let data = client.search({
        index: 'action_movies',
        type: 'movie',
        body: {
            size: 100,
            query: {
                "bool": {
                    "should": [
                        { "match": { "title": param } },
                        { "match": { "actors.name": param } }
                    ]
                }

            }
        }
    }, (err, data) => {
        return res.send(JSON.stringify(data));
    })
});

app.get('/api/searchById', (req, res) => {
    let id = req.query.id;
    let data = client.search({
        index: 'action_movies',
        type: 'movie',
        body: {
            query: {
                match: {
                    '_id': id
                }

            }
        }
    }, (err, data) => {
        return res.send(JSON.stringify(data));
    })
});

app.get('/api/topActors', (req, res) => {
    let data = client.search({
        index: 'action_movies',
        type: 'movie',
        body: {
            "size": 0,
            "aggs": {
                "actors": {

                    "terms": {
                        "field": "actors.name.keyword",
                        "min_doc_count": 10,
                        "order": {
                            "_count": "desc"
                        },
                        "size": 100,
                    },
                    "aggs": {
                        "avg_rating": {
                            "avg": {
                                "field": "rating"
                            }
                        }
                    }
                }
            },
            "query": {
                "bool": {
                    "must": [
                        {
                            "range": {
                                "releaseDate": {
                                    "gte": "1990",
                                    "lte": "2018",
                                    "format": "dd-MM-yyyy"
                                }
                            }
                        },
                        {
                            "range": {
                                "rating": {
                                    "gte": 6
                                }
                            }
                        },
                        {
                            "range": {
                                "ratingCount": {
                                    "gte": 10000
                                }
                            }
                        },
                        {
                            "range": {
                                "runTimeInMinutes": {
                                    "gte": 30
                                }
                            }
                        }
                    ]
                }
            }
        }
    },
        (err, data) => {
            return res.send(JSON.stringify(data))
        })
});

app.get('/api/topDirectors', (req, res) => {
    let data = client.search({
        index: 'action_movies',
        type: 'movie',
        body: {
            "size": 0,
            "aggs": {
                "directors": {
                    "terms": {
                        "field": "directors.keyword",
                        "size": 100
                    },
                    "aggs": {
                        "avg_gross": {
                            "avg": {
                                "field": "gross"
                            }
                        },
                        "gross_bucket_filter": {
                            "bucket_selector": {
                                "buckets_path": {
                                    "avgGross": "avg_gross"
                                },
                                "script": "params.avgGross > 10000000"
                            }
                        },
                        "avg_gross_bucket_sort": {
                            "bucket_sort": {
                                "sort": [
                                    {
                                        "avg_gross": {
                                            "order": "desc"
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

app.get('/api/topMovies', (req, res) => {
    let data = client.search({
        index: 'action_movies',
        type: 'movie',
        body: {
            "sort": [
                { "rating": { "order": "desc", "mode": "avg" } },
                { "ratingCount": { "order": "desc", "mode": "avg" } }
            ],
            "size": 100,
            "query": {
                "range": {
                    "ratingCount": {
                        "gte": 100000
                    }
                }
            }
        }
    }, (err, data) => {
        return res.send(JSON.stringify(data));
    })
});

app.get('/api/genres', (req, res) => {
    let data = client.search({
        index: 'action_movies',
        type: 'movie',
        body: {
            "size": 0,
            "aggregations": {
                "genres": {
                    "terms": {
                        "field": "genres.keyword",
                        "size": 1000
                    }
                }
            },
        }
    }, (err, data) => {
        return res.send(JSON.stringify(data));
    })
});

app.get('/api/countries', (req, res) => {
    let data = client.search({
        index: 'action_movies',
        type: 'movie',
        body: {
            "size": 0,
            "aggregations": {
                "countries": {
                    "terms": {
                        "field": "countries.keyword",
                        "size": 1000
                    }
                }
            },
        }
    }, (err, data) => {
        return res.send(JSON.stringify(data));
    })
});

app.post('/api/customSearch', (req, res) => {

    let title = req.body.title;
    let rating = req.body.rating;
    let genre = req.body.genre;
    let country = req.body.country;

    let title_query = "";
    if (title !== "") {
        title_query = "\"match\": { \"title\":\"" + title + "\"} ";
    }
    let country_query = "";
    if (country !== "") {
        country_query = ",{\"match\": { \"countries\":\"" + country + "\"}} ";
    }
    let genre_query = "";
    if (genre !== "") {
        genre_query = ",{\"match\": { \"genres\":\"" + genre + "\"}} ";
    }

    let rating_query = "";
    if (rating !== "") {
        rating_query = ",{\"range\": { \"rating\": {\"gte\" : " + rating + "}}}";
    }

    var must_query = "{\"size\": 100,\"query\": {\"bool\":{\"must\": [{" + title_query + "}" + rating_query + "" + genre_query + "" + country_query + "]}}}";

    let data = client.search({ "index": "action_movies", "type": "movie", body: must_query },
        (err, data) => {
            return res.send(JSON.stringify(data));
        })
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))