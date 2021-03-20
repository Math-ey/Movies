import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DirectorRoutingModule } from './director-routing.module';
import { TopDirectorsComponent } from './pages/top-directors/top-directors.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [TopDirectorsComponent],
  imports: [
    CommonModule,
    DirectorRoutingModule,
    SharedModule
  ]
})
export class DirectorModule { }
