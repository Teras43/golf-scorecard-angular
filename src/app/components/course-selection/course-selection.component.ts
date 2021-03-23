import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Courses } from 'src/app/interfaces/courses';
import { ApiDataService } from '../../services/api-data.service';

@Component({
  selector: 'app-course-selection',
  templateUrl: './course-selection.component.html',
  styleUrls: ['./course-selection.component.scss']
})
export class CourseSelectionComponent implements OnInit {
  $courses: Observable<Courses[]>

  constructor(private apiData: ApiDataService) { }

  ngOnInit(): void {
    this.$courses = this.apiData.getApiData()
    console.log(this.$courses)
  }

}
