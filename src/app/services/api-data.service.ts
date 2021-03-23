import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Courses } from '../interfaces/courses';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiDataService {
  // private data: any = []
  
  constructor(private http: HttpClient) { }
  
  getApiData(): Observable<Courses[]> {
    const api = 'http://golf-courses-api.herokuapp.com/courses';
    const headers = new HttpHeaders()
      .set('content-type', 'application/json');
  
    return this.http.get<Courses[]>(api, { 'headers': headers })
      // .subscribe(res => {
      //   this.data = res
      //   console.log(res)
      // })
  }
}
