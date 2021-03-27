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

  // Pagination
  page = 1;
  collectionSize = 0;
  pageSize = 9;
  maxSize = 7;

  searchParams = null;


  constructor(private movieService: MovieService, private genreService: GenreService, private countryService: CountryService) { }

  ngOnInit(): void {
    this.genreService.getGenres().subscribe(data => {
      this.genres = data.aggregations.genres.buckets;
    });
    this.countryService.getCountries().subscribe(data => {
      this.countries = data.aggregations.countries.buckets;
    });
  }

  SearchMovie(title, genre, country, rating): void {
    this.searchParams = { title, genre, country, rating };
    this.searchParams["page"] = this.page - 1;
    this.searchParams["limit"] = this.pageSize;
    this.movieService.getMovies(this.searchParams).subscribe(res => {

      this.collectionSize = res.hits.total.value;

      let hitsArr = res.hits.hits;
      this.movies = hitsArr.map(hit => this.MapMovie(hit))
    });
  }

  MapMovie(hit): Movie {
    return {
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
    } as Movie;
  }

  loadPage(e) {
    console.log(e)

    this.searchParams.page = this.page - 1;
    this.movieService.getMovies(this.searchParams).subscribe(res => {
      let hitsArr = res.hits.hits;
      this.movies = hitsArr.map(hit => this.MapMovie(hit))
    });
  }

}
