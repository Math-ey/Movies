import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule, 
    HttpClientModule
  ],
  exports: [HeaderComponent]
})
export class CoreModule { }
