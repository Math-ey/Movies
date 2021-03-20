import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopActorsComponent } from './pages/top-actors/top-actors.component';
import { ActorRoutingModule } from './actor-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [TopActorsComponent],
  imports: [
    CommonModule,
    ActorRoutingModule,
    SharedModule
  ]
})
export class ActorModule { }
