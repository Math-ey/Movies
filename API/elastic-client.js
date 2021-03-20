var elasticsearch = require('elasticsearch')
var config = require('./cfg.json');

var client = new elasticsearch.Client({
    host: config.elasticsearchServerAddress,
    log: 'trace'
})

module.exports = client;