import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FirebaseApi } from 'src/app/interfaces/firebase';

@Component({
  selector: 'app-firebase-db',
  templateUrl: './firebase-db.component.html',
  styleUrls: ['./firebase-db.component.scss']
})
export class FirebaseDbComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  // getRepoIssues = (sort: string, order: string, page: number): Observable<FirebaseApi>  => {
    // const href = 'https://api.github.com/search/issues';
    // const requestUrl =
    //     `${href}?q=repo:angular/components&sort=${sort}&order=${order}&page=${page + 1}`;

    // return this.http.get<FirebaseApi>(requestUrl);
  // }
}
