import { ComponentFactoryResolver, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie';


@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }

  getMovies(searchParams): Observable<any> {

    Object.keys(searchParams).forEach(x => {
      if(searchParams[x] == null){
        searchParams[x] = "";
      }
    })

    let url: string = "api/movies";
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      params: searchParams
    };
    return this.http.get(url, httpOptions);
  }

  getMovie(id: string): Observable<any> {
    let url: string = `api/movies/${id}`;
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.get(url, httpOptions);
  }

  getTopMovies(paginationParams): Observable<any> {
    let url: string = "api/movies/top";
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      params: paginationParams
    };
    return this.http.get(url, httpOptions);
  }

  mapMovie(esHit: any): Movie {
    return {
      title: esHit._source.title,
      plot: esHit._source.plot,
      budget: esHit._source.budget,
      gross: esHit._source.gross,
      runTimeInMinutes: esHit._source.runTimeInMinutes,
      rating: esHit._source.rating,
      ratingCount: esHit._source.ratingCount,
      releaseDate: esHit._source.releaseDate,
      countries: esHit._source.countries,
      languages: esHit._source.languages,
      genres: esHit._source.genres,
      directors: esHit._source.directors,
      writers: esHit._source.writers,
      actors: esHit._source.actors,
      id: esHit._id,
      posterUrl: esHit._source.posterUrl
    } as Movie;
  }

  mapMovies(esHits: any): Movie[]{
    return esHits.map(hit => this.mapMovie(hit));
  }
}
