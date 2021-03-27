import { ComponentFactoryResolver, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';


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
