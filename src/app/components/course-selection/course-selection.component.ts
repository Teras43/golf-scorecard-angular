import { Component, OnInit } from '@angular/core';
import { ApiDataService } from '../../api-data.service';

@Component({
  selector: 'app-course-selection',
  templateUrl: './course-selection.component.html',
  styleUrls: ['./course-selection.component.scss']
})
export class CourseSelectionComponent implements OnInit {

  constructor(private apiData: ApiDataService) { }

  ngOnInit(): void {
    this.apiData.getApiData()
  }

}
