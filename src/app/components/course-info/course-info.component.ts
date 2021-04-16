import { Component, OnInit } from '@angular/core';
import { CourseData } from 'src/app/interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiDataService } from 'src/app/services/api-data.service';
import { AbstractControl, FormControl, ValidatorFn } from '@angular/forms';
import { DataShareService } from 'src/app/services/data-share.service';
import { PlayerNamePipePipe } from 'src/app/pipes/player-name-pipe.pipe';
import { AngularFireService } from 'src/app/services/angular-fire.service';



@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.scss'],
  providers: [PlayerNamePipePipe]
})
export class CourseInfoComponent implements OnInit {
  data: CourseData;
  id: string;
  playerName = new FormControl('', this.nameVal());
  cardId = 0;
  maxPlayers = 4;

  constructor(
    private activeRoute: ActivatedRoute,
    private apiData: ApiDataService,
    private router: Router,
    public setData: DataShareService,
    private namePipe: PlayerNamePipePipe,
    private db: AngularFireService
  ) { }

  ngOnInit(): void {
    this.id = this.activeRoute.snapshot.paramMap.get("id");
    this.apiData.getSingleCourse(this.id).subscribe(res => {
      this.data = res.data
      this.setData.setData(res.data);
      this.data.holes[0].teeBoxes.forEach((v, i) => {
        this.setData.holeToIndex[v.teeType] = i
      });
    })
  }

  externalSiteNav = (site) => {
    window.open(site, '_blank');
  }

  nameVal(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let error = null;
      if (this.setData.players && this.setData.players.length) {
        this.setData.players.forEach(player => {
          if (player.name.toLowerCase() === control.value.toLowerCase()) {
            error = {duplicate: true};
          }
        });
      }
      return error;
    };
  }

  addPlayers = ($event): void => {
    if($event.type === 'keydown' && $event.keyCode !== 13) return;
    if(this.playerName.value === null || this.playerName.value === undefined) return;
    if(this.setData.players.length === 4) return;
    if (this.playerName.value) {
      this.setData.players.forEach(player => {
        if (this.playerName.value == player.name) {
          this.playerName.setValue(this.namePipe.transform(this.playerName.value))
        }
      })
      this.setData.players.push({
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
          outTotal: 0,
          inTotal: 0,
          total: 0,
        }
      });
      this.playerName.setValue('');
    }
  }

  startGame = (cardId): void => {
    if (this.setData.players.length >= 1){
      this.router.navigate([`./scorecard/${cardId}`])
    }
    this.db.saveGame(this.setData.players)
  }
}
