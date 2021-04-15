import { Component, HostListener, OnInit } from '@angular/core';
import { Course } from 'src/app/interfaces';
import { ApiDataService } from '../../services/api-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-selection',
  templateUrl: './course-selection.component.html',
  styleUrls: ['./course-selection.component.scss']
})
export class CourseSelectionComponent implements OnInit {
  courses: Course[] = []
  public screenWidth: any;

  constructor(
    private apiData: ApiDataService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.apiData.getApiData().subscribe(res => {
      this.courses = res.courses
    })
    this.screenWidth = window.innerWidth;
  }

  selectCourse(courseId) {
    this.router.navigate([`/course-info/${courseId}`]);
  }

  isLoaded = (): boolean => {
    if (this.courses.length === 0) {
      return false;
    } else {
      return true;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.screenWidth = window.innerWidth;
  }
}
