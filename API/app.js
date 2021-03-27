const express = require('express')
const config = require('./cfg.json');
const app = express()
app.use(express.json());

app.get('/api', (req, res) => {
    res.send('Hello World!')
});

const moviesRoute = require('./routes/movies');
const genresRoute = require('./routes/genres');
const countriesRoute = require('./routes/countries');
const actorsRoute = require('./routes/actors');
const directorsRoute = require('./routes/directors');

app.use('/api/movies', moviesRoute);
app.use('/api/genres', genresRoute);
app.use('/api/countries', countriesRoute);
app.use('/api/actors', actorsRoute);
app.use('/api/directors', directorsRoute);

const PORT = process.env.PORT || config.apiPort;

app.listen(PORT, () => console.log(`API app listening on port ${PORT}!`))