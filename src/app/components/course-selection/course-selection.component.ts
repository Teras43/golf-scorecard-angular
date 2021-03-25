import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/interfaces';
import { ApiDataService } from '../../services/api-data.service';

@Component({
  selector: 'app-course-selection',
  templateUrl: './course-selection.component.html',
  styleUrls: ['./course-selection.component.scss']
})
export class CourseSelectionComponent implements OnInit {
  courses: Course[] = []

  constructor(private apiData: ApiDataService) { }

  ngOnInit(): void {
    this.apiData.getApiData().subscribe(res => {
      this.courses = res.courses
    })
  }
}
