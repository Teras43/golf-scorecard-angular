import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(
    public location: Location,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  goHome = () => {
    this.router.navigate(['./course-selection'])
    .then(() => {
      window.location.reload();
    });
  }
}
