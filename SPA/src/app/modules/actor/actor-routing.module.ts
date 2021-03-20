import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TopActorsComponent } from './pages/top-actors/top-actors.component';

const routes: Routes = [
    {
        path: '',
        component: TopActorsComponent
      },
      {
        path: 'top',
        component: TopActorsComponent
      },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActorRoutingModule { }