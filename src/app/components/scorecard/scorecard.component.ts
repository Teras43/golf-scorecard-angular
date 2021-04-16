import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataShareService } from 'src/app/services/data-share.service';
import { teeTypes } from '../../interfaces';
import { AngularFireService } from '../../services/angular-fire.service';

@Component({
  selector: 'app-scorecard',
  templateUrl: './scorecard.component.html',
  styleUrls: ['./scorecard.component.scss']
})

export class ScorecardComponent implements OnInit {
  public data = undefined;
  public selectedTeeType;
  public teeIndex;
  players = this.dataShare.players;
  outTotalYards = 0;
  inTotalYards = 0;
  outTotalPar = 0;
  inTotalPar = 0;
  selectedValue: string;
  durationInSeconds = 5;
  teeTypesPro: teeTypes[] = [
    {
      index: 0,
      name: "pro",
      viewName: "Pro"
    },
    { 
      index: 1,
      name: "champion",
      viewName: "Champion"
    },
    { 
      index: 2,
      name: "men",
      viewName: "Men" 
    },
    { 
      index: 3,
      name: "women",
      viewName: "Women"
    }
  ]
  teeTypesNoPro: teeTypes[] = [
    { 
      index: 0,
      name: "champion",
      viewName: "Champion"
    },
    { 
      index: 1,
      name: "men",
      viewName: "Men" 
    },
    { 
      index: 2,
      name: "women",
      viewName: "Women"
    }
  ]

  constructor(
    public dataShare: DataShareService,
    public playerService: AngularFireService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.data = this.dataShare.getData();
    this.getTeeTypes();
    this.setYardage();
    this.getTotalPar();
  }

  snackBarCheck = (playerName, total) => {
    if(total <= this.outTotalPar + this.inTotalPar) {
      this.goodSnackBar(playerName);
    } else {
      this.badSnackBar(playerName);
    }
  }

  goodSnackBar = (playerName) => {
    this._snackBar.open(`${playerName} has a good swing!`, "Time to go pro!", {
      duration: this.durationInSeconds * 1000,
    });
  }

  badSnackBar = (playerName) => {
    this._snackBar.open(`${playerName} work on your swing.`, "Keep practicing!", {
      duration: this.durationInSeconds * 1000,
    });
  }


  isLoaded = (): boolean => {
    if (this.data === undefined) {
      return false;
    } else {
      return true;
    }
  };

  savePlayer = (player) => {
    this.playerService.savePlayer(player);
  }

  setYardage = (): any => {
    this.outTotalYards = 0;
    this.inTotalYards = 0;
    if (this.selectedTeeType == this.teeTypesPro ) {
      this.teeTypesPro.forEach(i => {
        if (i.name === this.selectedValue) {
          this.teeIndex = i.index;
          return this.teeIndex;
        }
      })
    } else if (this.selectedTeeType == this.teeTypesNoPro) {
      this.teeTypesNoPro.forEach(i => {
        if (i.name === this.selectedValue) {
          this.teeIndex = i.index;
          return this.teeIndex;
        }
      })
    }
    if(this.data !== undefined) {
      this.data.holes.forEach((i, val) => {
        if (val < 9) {
          this.outTotalYards += i.teeBoxes[this.teeIndex].yards;
        } else if (val > 8 && val < 18) {
          this.inTotalYards += i.teeBoxes[this.teeIndex].yards;
        }
      })
    }
  }

  getTeeTypes = (): any => {
    if (this.data !== undefined) {
      if (this.data.holes[0].teeBoxes[0].teeType === "pro") {
        this.selectedTeeType = this.teeTypesPro;
        this.selectedValue = "pro";
      } else {
        this.selectedTeeType = this.teeTypesNoPro;
        this.selectedValue = "champion";
      }
    }
  }

  getTotalPar = (): any => {
    if (this.data !== undefined) {
      this.data.holes.forEach((hole, index) => {
        if (index < 9) {
          this.outTotalPar += hole.teeBoxes[0].par;
        } else {
          this.inTotalPar += hole.teeBoxes[0].par;
        }
      })
    }
  }

  addScore = (playerName, event, holeNum): any => {
    if (event === "") {
      event = 0;
    }
    this.dataShare.players.forEach((name) => {
      let playerScores = Object.keys(name.score);
      if (playerName === name.name) {
        name.score.total = 0;
        name.score.outTotal = 0;
        name.score.inTotal = 0;
        name.score["hole" + holeNum] = parseInt(event);
        playerScores.forEach((hole, i) => {
          if (i < 9 && name.score[hole] !== undefined) {
            name.score.outTotal += name.score[hole];
          }
          if (i > 8 && i <18 && name.score[hole] !== undefined) {
            name.score.inTotal += name.score[hole];
          }
        })
        name.score.total = name.score.outTotal + name.score.inTotal;
        if (Object.values(name.score).includes(0)) {
          return
        } else {
          this.snackBarCheck(name.name, name.score.total);
        }
      }
    })
  }
}
