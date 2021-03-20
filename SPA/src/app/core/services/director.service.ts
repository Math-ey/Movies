import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DirectorService {

  constructor(private http: HttpClient) { }

  getTopDirectors(): Observable<any> {
    let url: string = "api/directors/top";
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    };
    return this.http.get(url, httpOptions);
  }
}
