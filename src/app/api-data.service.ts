import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiDataService {
  private data: any = []
  
  constructor(private http: HttpClient) { }
  
  public getApiData(): void {
    const api = 'api/';
    const apiHeader = {
      'Content-Type': 'application/json'
    }
  
    this.http.get(api + 'courses').subscribe(res => {
      this.data = res;
      console.log(this.data);
    })
  }
}
