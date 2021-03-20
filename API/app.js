const express = require('express')
const bodyParser = require('body-parser');
const app = express()
var config = require('./cfg.json');
app.use(bodyParser.json());

app.get('/api', (req, res) => {
    res.send('Hello World!')
});

var movies = require('./movies.js');
var genres = require('./genres.js');
var countries = require('./countries.js');
var actors = require('./actors.js');
var directors = require('./directors.js');

app.use('/api/movies', movies);
app.use('/api/genres', genres);
app.use('/api/countries', countries);
app.use('/api/actors', actors);
app.use('/api/directors', directors);

app.listen(config.apiPort, () => console.log(`Example app listening on port ${config.apiPort}!`))