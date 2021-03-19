import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ElasticSearchService {

  constructor(private http: HttpClient) { }

  
  

  getMovies(title: string): Observable<any> {
   
    let param = new HttpParams();
    param.set("term", title);
    let url: string = "api/searchByTitle";

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      params: new HttpParams().set('searchValue', title)
    };
    return this.http.get(url, httpOptions );
    
  }

  getMovie(id: string): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      params: new HttpParams().set('id', id)
    };
    let url: string = "api/searchById";
    return this.http.get(url, httpOptions );
  }

  getTopActors(): Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    };
    let url: string = "api/topActors";
    return this.http.get(url, httpOptions );
  }

  getTopMovies(): Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    };
    let url: string = "api/topMovies";
    return this.http.get(url, httpOptions );
  }

  getTopDirectors(): Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    };
    let url: string = "api/topDirectors";
    return this.http.get(url, httpOptions );
  }

  getGenres(): Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    };
    let url: string = "api/genres";
    return this.http.get(url, httpOptions );
  }
  getCountries(): Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    };
    let url: string = "api/countries";
    return this.http.get(url, httpOptions );
  }

  getMoviesCustomSearch(title, rating, genre, country): Observable<any> {
   
    let url: string = "api/customSearch";
    let data = {
      title: title,
      rating: rating,
      genre: genre,
      country: country
    }

    console.log(data.title);
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(url, data, httpOptions );
    
  }

}
