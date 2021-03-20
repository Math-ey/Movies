import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieListComponent } from './pages/movie-list/movie-list.component';
import { MovieDetailComponent } from './pages/movie-detail/movie-detail.component';
import { MovieRoutingModule } from './movie-routing.module';
import { MovieCardComponent } from './components/movie-card/movie-card.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TopMoviesComponent } from './pages/top-movies/top-movies.component';



@NgModule({
  declarations: [MovieListComponent, MovieDetailComponent, MovieCardComponent, TopMoviesComponent],
  imports: [
    CommonModule, 
    MovieRoutingModule,
    SharedModule
  ]
})
export class MovieModule { }
