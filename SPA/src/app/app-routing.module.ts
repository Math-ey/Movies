import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 
import { FullTextSearchComponent } from './full-text-search/full-text-search.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { TopActorsComponent } from './top-actors/top-actors.component';
import { TopMoviesComponent } from './top-movies/top-movies.component';
import { CustomSearchComponent } from './custom-search/custom-search.component';
import { TopDirectorsComponent } from './top-directors/top-directors.component';

const routes: Routes = [
  { path: '', redirectTo: '/full-text-search', pathMatch: 'full' },
  { path: 'full-text-search', component: FullTextSearchComponent },
  { path: 'top-actors', component: TopActorsComponent },
  { path: 'top-movies', component: TopMoviesComponent },
  { path: 'custom-search', component: CustomSearchComponent },
  { path: 'top-directors', component: TopDirectorsComponent  },
  { path: 'movie-details/:id', component: MovieDetailComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
