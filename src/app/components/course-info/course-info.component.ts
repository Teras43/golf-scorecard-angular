import { Component, OnInit } from '@angular/core';
import { CourseData, Players } from 'src/app/interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiDataService } from 'src/app/services/api-data.service';
import { Observable } from 'rxjs';
import { AbstractControl, FormControl, ValidatorFn } from '@angular/forms';
import { ScorecardComponent } from '../scorecard/scorecard.component';

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
  data: CourseData;
  id: string;
  holeToIndex: TeeTypes = {} as TeeTypes;
  players: Players[] = [];
  playerName = new FormControl('', this.nameVal());
  playerId = 0;
  cardId = 0;

  constructor(
    private activeRoute: ActivatedRoute,
    private apiData: ApiDataService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.activeRoute.snapshot.paramMap.get("id");
    this.apiData.getSingleCourse(this.id).subscribe(res => {
      this.data = res.data
      console.log(this.data);
      res.data.holes[0].teeBoxes.forEach((v, i) => {
        this.holeToIndex[v.teeType] = i
      });
    })
  }

  nameVal(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let error = null;
      if (this.players && this.players.length) {
          this.players.forEach(employee => {
              if (employee.name.toLowerCase() === control.value.toLowerCase()) {
                  error = {duplicate: true};
              }
          });
          if (this.players.length > 4) {
            error = {full: true};
          }
      }
      return error;
    };
  }

  getYardage = (type: "pro" | "champion" | "men" | "women"): string => {
    const index = this.holeToIndex[type]
    if (index === undefined ) return "No TeeType"
    let total = 0
    this.data.holes.forEach(v => total += v.teeBoxes[index].yards)
    return total.toString()
  }

  addPlayers = ($event): void => {
    if($event.type === 'keydown' && $event.keyCode !== 13) return;
    if(this.playerName.value === null || this.playerName.value === undefined) return;
    // if(this.players.length > 4) 
    if (this.playerName.value) {
      this.playerId++;

      this.players.push({
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
      console.log(this.players);
    }
  }

  startGame = (cardId): void => {
    if (this.players.length >= 1){
      cardId++
      this.router.navigate([`./scorecard/${cardId}`])
    }
  }
}
