import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FullTextSearchComponent } from './full-text-search/full-text-search.component';
import { ElasticSearchService } from  './services/elastic-search.service';
import { HttpClientModule } from '@angular/common/http';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { TopActorsComponent } from './top-actors/top-actors.component';
import { TopMoviesComponent } from './top-movies/top-movies.component';
import { CustomSearchComponent } from './custom-search/custom-search.component';
import { NgTempusdominusBootstrapModule } from 'ngx-tempusdominus-bootstrap';
import { FormsModule } from '@angular/forms';
import { TopDirectorsComponent } from './top-directors/top-directors.component';
import { MovieCardComponent } from './movie-card/movie-card.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FullTextSearchComponent,
    MovieDetailComponent,
    TopActorsComponent,
    TopMoviesComponent,
    CustomSearchComponent,
    TopDirectorsComponent,
    MovieCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule.forRoot(),
    FormsModule,
    NgTempusdominusBootstrapModule,
  ],
  providers: [ElasticSearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
