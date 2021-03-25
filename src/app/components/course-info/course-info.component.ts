import { Component, OnInit } from '@angular/core';
import { CourseData } from 'src/app/interfaces';
import { ActivatedRoute } from '@angular/router';
import { ApiDataService } from 'src/app/services/api-data.service';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.scss']
})
export class CourseInfoComponent implements OnInit {
  data: CourseData
  id: string

  constructor(
    private activeRoute: ActivatedRoute,
    private apiData: ApiDataService
  ) { }

  ngOnInit(): void {
    this.id = this.activeRoute.snapshot.paramMap.get("id");
    this.apiData.getSingleCourse(this.id).subscribe(res => {
      this.data = res.data
      console.log(this.data);
    })
  }

}
