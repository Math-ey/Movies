import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TopDirectorsComponent } from './pages/top-directors/top-directors.component';

const routes: Routes = [
  {
    path: '',
    component: TopDirectorsComponent
  },
  {
    path: 'top',
    component: TopDirectorsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DirectorRoutingModule { }
