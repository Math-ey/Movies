import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ElasticSearchService {

  constructor(private http: HttpClient) { }

  getMoviesSimple(title: string): Observable<any> {
    let url: string = "api/movies";
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      params: new HttpParams()
        .set('title', title)
    };
    return this.http.get(url, httpOptions);
  }

  getMovies(title: string, genre: string, country: string, rating: number): Observable<any> {
    let url: string = "api/movies";
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      params: new HttpParams()
        .set('title', title)
        .set('genre', genre)
        .set('country', country)
        .set('rating', rating.toString())
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

  getTopActors(): Observable<any> {
    let url: string = "api/actors/top";
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    };
    return this.http.get(url, httpOptions);
  }

  getTopMovies(): Observable<any> {
    let url: string = "api/movies/top";
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    };
    return this.http.get(url, httpOptions);
  }

  getTopDirectors(): Observable<any> {
    let url: string = "api/directors/top";
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    };
    return this.http.get(url, httpOptions);
  }

  getGenres(): Observable<any> {
    let url: string = "api/genres";
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    };
    return this.http.get(url, httpOptions);
  }
  getCountries(): Observable<any> {
    let url: string = "api/countries";
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    };
    return this.http.get(url, httpOptions);
  }
}
