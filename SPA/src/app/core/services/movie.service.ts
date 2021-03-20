import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }

  getMovies(title?: string, genre?: string, country?: string, rating?: string): Observable<any> {
    let url: string = "api/movies";
    let params: HttpParams = new HttpParams();

    if(title){
      params = params.append('title', title);
    }

    if(genre){
      params = params.append('genre', genre);
    }

    if(country){
      params = params.append('country', country);
    }

    if(rating){
      params = params.append('rating', rating);
    }

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      params: params
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

  getTopMovies(): Observable<any> {
    let url: string = "api/movies/top";
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    };
    return this.http.get(url, httpOptions);
  }
}
