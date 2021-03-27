import { Component, OnInit } from '@angular/core';
import { CourseData } from 'src/app/interfaces';
import { ActivatedRoute } from '@angular/router';
import { ApiDataService } from 'src/app/services/api-data.service';

type TeeTypes = {
  "pro": number,
  "champion": number,
  "men": number,
  "women": number
}

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.scss']
})
export class CourseInfoComponent implements OnInit {
  data: CourseData
  id: string
  holeToIndex: TeeTypes = {} as TeeTypes

  constructor(
    private activeRoute: ActivatedRoute,
    private apiData: ApiDataService
  ) { }

  ngOnInit(): void {
    this.id = this.activeRoute.snapshot.paramMap.get("id");
    this.apiData.getSingleCourse(this.id).subscribe(res => {
      this.data = res.data
      console.log(this.data);
      res.data.holes[0].teeBoxes.forEach((v, i) => {
        this.holeToIndex[v.teeType] = i
      })
    })
  }

  getYardage = (type: "pro" | "champion" | "men" | "women"): string => {
    const index = this.holeToIndex[type]
    if (index === undefined ) return "No TeeType"
    let total = 0
    this.data.holes.forEach(v => total += v.teeBoxes[index].yards)
    return total.toString()
  }
}
