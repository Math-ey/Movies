import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/core/models/movie';
import { CountryService } from 'src/app/core/services/country.service';
import { GenreService } from 'src/app/core/services/genre.service';
import { MovieService } from 'src/app/core/services/movie.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  genres: any[];
  countries: any[];
  movies: Movie[];
  activeTab: number = 1;

  constructor(private movieService : MovieService, private genreService: GenreService, private countryService: CountryService) { }

  ngOnInit(): void {
    this.genreService.getGenres().subscribe(data => {
      this.genres = data.aggregations.genres.buckets;
    });
    this.countryService.getCountries().subscribe(data => {
      this.countries = data.aggregations.countries.buckets;
    });
  }

  SearchMovie (searchVal?: string, genre?: string, country?: string, rating?: string): void{
    this.movieService.getMovies(searchVal, genre, country, rating).subscribe(res=>{
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
          id: hit._id,
          posterUrl: hit._source.posterUrl
        };
        return movie;
      })
    });
  }

}
