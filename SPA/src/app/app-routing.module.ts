import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreComponent } from './core/core.component';

export const routes: Routes = [
  {
    path: '',
    component: CoreComponent,
    children: [
      {
        path: '', redirectTo: '/movies', pathMatch: 'full'
      },
      {
        path: 'movies', loadChildren: () => import('./modules/movie/movie.module').then(m => m.MovieModule)
      },
      {
        path: 'actors', loadChildren: () => import('./modules/actor/actor.module').then(m => m.ActorModule)
      },
      {
        path: 'directors', loadChildren: () => import('./modules/director/director.module').then(m => m.DirectorModule)
      }
    ]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: false})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
