import { Component, OnInit } from '@angular/core';
import { DataShareService } from 'src/app/services/data-share.service';
import { teeTypes } from '../../interfaces';

@Component({
  selector: 'app-scorecard',
  templateUrl: './scorecard.component.html',
  styleUrls: ['./scorecard.component.scss']
})
export class ScorecardComponent implements OnInit {
  public data = undefined;
  players = this.getData.players;
  public teeIndex;
  outTotalYards = 0;
  inTotalYards = 0;
  outTotalPar = 0;
  inTotalPar = 0;
  selectedValue = "pro"
  public selectedTeeType;
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
    private getData: DataShareService,
    public setData: DataShareService
  ) { }

  ngOnInit(): void {
    this.data = this.getData.getData();
    console.log(this.data)
    this.getTeeTypes();
    this.setYardage();
    this.getTotalPar();
  }

  setYardage = (): any => {
    this.outTotalYards = 0;
    this.inTotalYards = 0;
    if (this.selectedTeeType === this.teeTypesPro ) {
      this.teeTypesPro.forEach(i => {
        if (i.name === this.selectedValue) {
          this.teeIndex = i.index;
          return this.teeIndex;
        }
      })
    } else if (this.selectedTeeType === this.teeTypesNoPro) {
      this.teeTypesNoPro.forEach(i => {
        if (i.viewName === this.selectedValue) {
          this.teeIndex = i.index;
          return this.teeIndex;
        }
      })
    }
    this.data.holes.forEach((i, val) => {
      if (val < 9) {
        this.outTotalYards += i.teeBoxes[this.teeIndex].yards;
      } else if (val > 8 && val < 18) {
        this.inTotalYards += i.teeBoxes[this.teeIndex].yards;
      }
    })
  }

  getTeeTypes = (): any => {
    if (this.data.holes[0].teeBoxes[0].teeType === "pro") {
      this.selectedTeeType = this.teeTypesPro;
    } else {
      this.selectedTeeType = this.teeTypesNoPro;
    }
  }

  getTotalPar = (): any => {
    this.data.holes.forEach((hole, index) => {
      if (index < 9) {
        this.outTotalPar += hole.teeBoxes[0].par;
      } else {
        this.inTotalPar += hole.teeBoxes[0].par;
      }
    })
  }

  addScore = (playerName, event, holeNum): any => {
    this.setData.players.forEach((name) => {
      if (playerName === name.name) {
        name.score["hole" + holeNum] = parseInt(event);
        if (holeNum <= 9) {
          name.score.outTotal += name.score["hole" + holeNum];
        }
        if (holeNum > 9) {
          name.score.inTotal += name.score["hole" + holeNum];
        }
        name.score.total = name.score.outTotal + name.score.inTotal;
      }
    })
  }
}
