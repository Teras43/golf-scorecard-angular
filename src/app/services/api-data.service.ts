import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiReturnData } from '../interfaces';
import { Observable } from 'rxjs';
import { CourseReturnData } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class ApiDataService {

  allCourses = 'https://golf-courses-api.herokuapp.com/courses';

  headers = new HttpHeaders()
    .set('content-type', 'application/json');
  
  constructor(private http: HttpClient) { }

  getApiData = (): Observable<ApiReturnData> => (
    this.http.get<ApiReturnData>(this.allCourses, { 'headers': this.headers, 'withCredentials': false })
  )

  getSingleCourse = (courseId): Observable<CourseReturnData> => (
    this.http.get<CourseReturnData>(this.allCourses + '/' + courseId, { 'headers': this.headers, 'withCredentials': false })
  )
}
