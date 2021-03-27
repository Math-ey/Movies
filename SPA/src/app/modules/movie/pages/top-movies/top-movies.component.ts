import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/core/models/movie';
import { MovieService } from 'src/app/core/services/movie.service';

@Component({
  selector: 'app-top-movies',
  templateUrl: './top-movies.component.html',
  styleUrls: ['./top-movies.component.css']
})
export class TopMoviesComponent implements OnInit {
  movies: Movie[];

  collectionSize: number = 0;
  pageSize: number = 25;
  page: number = 0;
  maxSize: number = 7;

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.initializeMovieList();
  }

  loadPage(event): void {
    this.movies = [];
    this.initializeMovieList();
  }

  initializeMovieList(): void {
    const paginationParams = {limit: this.pageSize, page: this.page - 1}
    this.movieService.getTopMovies(paginationParams).subscribe(res => {
      this.collectionSize = res.hits.total.value >= 100 ? 100 : res.hits.total.value;
      let hits = res.hits.hits;
      this.movies = this.movieService.mapMovies(hits);
    })
  }

  
}
