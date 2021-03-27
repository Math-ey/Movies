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
    this.page = 1;
    this.searchParams["page"] = this.page - 1;
    this.searchParams["limit"] = this.pageSize;
    
    this.initMovieList();
  }

  loadPage(event): void {
    this.searchParams.page = this.page - 1;

    this.initMovieList();
  }

  initMovieList(): void {
    this.movieService.getMovies(this.searchParams).subscribe(res => {
      this.collectionSize = res.hits.total.value;
      const hits = res.hits.hits;
      this.movies = this.movieService.mapMovies(hits);
    });
  }

}
