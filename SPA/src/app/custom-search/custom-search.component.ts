import { Component, OnInit } from '@angular/core';
import { ElasticSearchService } from '../services/elastic-search.service';
import { Movie } from '../model/movie';

@Component({
  selector: 'app-custom-search',
  templateUrl: './custom-search.component.html',
  styleUrls: ['./custom-search.component.css']
})
export class CustomSearchComponent implements OnInit {

  genres: any[];
  countries: any[];
  movies: Movie[];
  constructor(private service: ElasticSearchService) { }

  ngOnInit() {
    this.service.getGenres().subscribe(data => {
      this.genres = data.aggregations.genres.buckets;
    });
    this.service.getCountries().subscribe(data => {
      this.countries = data.aggregations.countries.buckets;
    });
  }

  submitButtonClicked(title, rating, genre, country){
    console.log(title);
    console.log(rating);
    console.log(genre);
    console.log(country);
    
    this.service.getMoviesCustomSearch(title, rating, genre, country).subscribe(res => {
      let hits = res.hits.hits;
      this.movies = hits.map( hit => {
        var movie = <Movie>{
          title: hit._source.title,
          plot: hit._source.plot,
          budget: hit._source.budget,
          gross: hit._source.gross,
          runTimeInMinutes: hit._source.runTimeInMinutes,
          rating: hit._source.rating,
          ratingCount: hit._source.ratingCount,
          releaseDate: hit._source.releaseDate,
          countries: hit._source.countries,
          languages: hit._source.languages,
          genres: hit._source.genres,
          directors: hit._source.directors,
          writers: hit._source.writers,
          actors: hit._source.actors,
          eId: hit._id,
          posterUrl: hit._source.posterUrl
        };
        return movie;
      })
    });
  }

}
