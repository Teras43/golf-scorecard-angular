import { Component, OnInit } from '@angular/core';
import { CourseData } from 'src/app/interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiDataService } from 'src/app/services/api-data.service';
import { AbstractControl, FormControl, ValidatorFn } from '@angular/forms';
import { DataShareService } from 'src/app/services/data-share.service';



@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.scss']
})
export class CourseInfoComponent implements OnInit {
  data: CourseData;
  id: string;
  playerName = new FormControl('', this.nameVal());
  playerId = 0;
  cardId = 0;
  maxPlayers = 4;

  constructor(
    private activeRoute: ActivatedRoute,
    private apiData: ApiDataService,
    private router: Router,
    public setData: DataShareService,
  ) { }

  // Issue when loading one of first two courses, then go back and load last course, display of "Pro" yardage is incorrect.

  ngOnInit(): void {
    this.id = this.activeRoute.snapshot.paramMap.get("id");
    this.apiData.getSingleCourse(this.id).subscribe(res => {
      this.data = res.data
      this.setData.setData(res.data);
      // console.log(this.data);
      res.data.holes[0].teeBoxes.forEach((v, i) => {
        this.setData.holeToIndex[v.teeType] = i
      });
    })
  }

  nameVal(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let error = null;
      if (this.setData.players && this.setData.players.length) {
          this.setData.players.forEach(employee => {
              if (employee.name.toLowerCase() === control.value.toLowerCase()) {
                  error = {duplicate: true};
              }
          });
          if (this.setData.players.length > 4) {
            error = {full: true};
          }
      }
      return error;
    };
  }

  addPlayers = ($event): void => {
    if($event.type === 'keydown' && $event.keyCode !== 13) return;
    if(this.playerName.value === null || this.playerName.value === undefined) return;
    if (this.playerName.value) {
      this.playerId++;

      this.setData.players.push({
        id: this.playerId,
        name: this.playerName.value,
        score: {
          hole1: 0,
          hole2: 0,
          hole3: 0,
          hole4: 0,
          hole5: 0,
          hole6: 0,
          hole7: 0,
          hole8: 0,
          hole9: 0,
          hole10: 0,
          hole11: 0,
          hole12: 0,
          hole13: 0,
          hole14: 0,
          hole15: 0,
          hole16: 0,
          hole17: 0,
          hole18: 0,
        }
      });
      this.playerName.setValue('');
      console.log(this.setData.players);
    }
  }

  startGame = (cardId): void => {
    if (this.setData.players.length >= 1){
      cardId++
      this.router.navigate([`./scorecard/${cardId}`])
    }
  }
}
