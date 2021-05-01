# Overview
This is a full-text search application, to search various action movies using Elasticsearch engine. App covers these use cases:

- Search and show list of movies 
- Display detail of the movie
- Show top rated movies 
- Show top actors
- Show top directors

![preview](preview.gif)

# Frontend
The frontend is an [Angular](https://angular.io/) project, the logic is devided into several modules and they are lazy loaded. The UI was build using [ng-Bootstrap](https://ng-bootstrap.github.io/#/home) module. 

# Backend
Backend is created using [Express](https://expressjs.com/) framework using [Node.js](https://nodejs.org/en/) environment. It serves as an REST API to the resources obtained from ElasticSearch server using [elasticsearch](https://www.npmjs.com/package/elasticsearch) module. 

## Data
Data is from 2018 and it was obtained from IMDB web page using web crawler. The crawler app is .NET console application, it crawls the data using [HtmlAgilityPack](https://www.nuget.org/packages/HtmlAgilityPack/) package and saves data as a json file. Then you can craete an ElasticSearch shard using [Nest](https://www.nuget.org/packages/Nest) package. 

## API

### Actors
- **GET api/actors/top** <br>
Returns the top 100 actors, which playd in the top rated movies. 

### Countries
- **GET api/countries** <br>
Returns all available countries for the search. 

### Directors
- **GET api/directors/top** <br>
Returns the top 100 directors, conditioned by the top rated movies. 
### Genres
- **GET api/genres** <br>
Returns all available genres for the search. 

### Movies
- **GET api/movies** (query params = title, rating, genre, country, page, limit)<br>
Returns list of movies, filtered by the provided parameters.

- **GET api/movies/top** (query params = page, limit)<br>
Returns top 100 rated movies.

- **GET api/movies/:id** <br>
Returns a specific movie.
