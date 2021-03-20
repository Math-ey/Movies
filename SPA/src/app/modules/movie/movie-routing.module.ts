import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieDetailComponent } from './pages/movie-detail/movie-detail.component';
import { MovieListComponent } from './pages/movie-list/movie-list.component';
import { TopMoviesComponent } from './pages/top-movies/top-movies.component';

const routes: Routes = [
    {
        path: '',
        component: MovieListComponent
    },
    {
        path: 'top',
        component: TopMoviesComponent
    },
    {
        path: ':id',
        component: MovieDetailComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MovieRoutingModule { }
