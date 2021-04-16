import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { DataShareService } from '../../services/data-share.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(
    public location: Location,
    public dataShare: DataShareService
  ) { }

  ngOnInit(): void {
  }
}
