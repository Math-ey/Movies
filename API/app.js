const express = require('express')
const bodyParser = require('body-parser');
const app = express()
var config = require('./cfg.json');
app.use(bodyParser.json());

app.get('/api', (req, res) => {
    res.send('Hello World!')
});

var movies = require('./Routes/movies');
var genres = require('./Routes/genres');
var countries = require('./Routes/countries');
var actors = require('./Routes/actors');
var directors = require('./Routes/directors');

app.use('/api/movies', movies);
app.use('/api/genres', genres);
app.use('/api/countries', countries);
app.use('/api/actors', actors);
app.use('/api/directors', directors);

app.listen(config.apiPort, () => console.log(`Example app listening on port ${config.apiPort}!`))