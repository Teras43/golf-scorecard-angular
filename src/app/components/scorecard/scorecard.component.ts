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
  outTotalYards = 0;
  inTotalYards = 0;
  selectedValue: string;
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
    private getData: DataShareService
  ) { }

  ngOnInit(): void {
    this.data = this.getData.getData();
    console.log(this.data)
    this.getTeeTypes();
    this.getTeeYardage();
  }

  getTeeTypes = (): any => {
    if (this.data.holes[0].teeBoxes[0].teeType === "pro") {
      this.selectedTeeType = this.teeTypesPro;
    } else {
      this.selectedTeeType = this.teeTypesNoPro;
    }
  }

  getTeeYardage = (): any => {
    this.data.holes.forEach((i, val) => {
      if (val < 9) {
        this.outTotalYards += i.teeBoxes[0].yards;
      } else if (val > 8 && val < 18) {
        this.inTotalYards += i.teeBoxes[0].yards;
      }
    })
  }

  // getTeeYardage = (): any => {
  //   if (this.dropDownElem.nativeElement.value === "pro") {
  //     this.data.holes.forEach((i, val) => {
  //       if (i.teeBoxes[3] !== undefined) {
  //         if (val < 9) {
  //           this.outTotalYards += i.teeBoxes[0].yards;
  //         } else if (val > 8 && val < 18) {
  //           this.inTotalYards += i.teeBoxes[0].yards;
  //         }
  //       }
  //     });
  //     // $(`.totalsYards`).html(outTotal + inTotal);
  //   } else if (this.dropDownElem.nativeElement.value === "champ") {
  //     this.data.data.holes.forEach((i, val) => {
  //       if (i.teeBoxes[3] !== undefined) {
  //         $(`.yardsHole${val + 1}`).html(i.teeBoxes[1].yards);
  //         if (val < 9) {
  //           outTotal += i.teeBoxes[1].yards;
  //         } else if (val > 8 && val < 18) {
  //           inTotal += i.teeBoxes[1].yards;
  //         }
  //         $(`.yardsOut`).html(outTotal);
  //         $(`.yardsIn`).html(inTotal);
  //       } else {
  //         $(`.yardsHole${val + 1}`).html(i.teeBoxes[0].yards);
  //         if (val < 9) {
  //           outTotal += i.teeBoxes[0].yards;
  //         } else if (val > 8 && val < 18) {
  //           inTotal += i.teeBoxes[0].yards;
  //         }
  //         $(`.yardsOut`).html(outTotal);
  //         $(`.yardsIn`).html(inTotal);
  //       }
  //     });
  //     $(`.totalsYards`).html(outTotal + inTotal);
  //     outTotal = 0;
  //     intotal = 0;
  //   } else if (teeList.value === "men") {
  //     singleCourse.data.holes.forEach((i, val) => {
  //       if (i.teeBoxes[3] !== undefined) {
  //         $(`.yardsHole${val + 1}`).html(i.teeBoxes[2].yards);
  //         if (val < 9) {
  //           outTotal += i.teeBoxes[2].yards;
  //         } else if (val > 8 && val < 18) {
  //           inTotal += i.teeBoxes[2].yards;
  //         }
  //         $(`.yardsOut`).html(outTotal);
  //         $(`.yardsIn`).html(inTotal);
  //       } else {
  //         $(`.yardsHole${val + 1}`).html(i.teeBoxes[1].yards);
  //         if (val < 9) {
  //           outTotal += i.teeBoxes[1].yards;
  //         } else if (val > 8 && val < 18) {
  //           inTotal += i.teeBoxes[1].yards;
  //         }
  //         $(`.yardsOut`).html(outTotal);
  //         $(`.yardsIn`).html(inTotal);
  //       }
  //     });
  //     $(`.totalsYards`).html(outTotal + inTotal);
  //     outTotal = 0;
  //     intotal = 0;
  //   } else if (teeList.value === "women") {
  //     singleCourse.data.holes.forEach((i, val) => {
  //       if (i.teeBoxes[3] !== undefined) {
  //         $(`.yardsHole${val + 1}`).html(i.teeBoxes[3].yards);
  //         if (val < 9) {
  //           outTotal += i.teeBoxes[3].yards;
  //         } else if (val > 8 && val < 18) {
  //           inTotal += i.teeBoxes[3].yards;
  //         }
  //         $(`.yardsOut`).html(outTotal);
  //         $(`.yardsIn`).html(inTotal);
  //       } else {
  //         $(`.yardsHole${val + 1}`).html(i.teeBoxes[2].yards);
  //         if (val < 9) {
  //           outTotal += i.teeBoxes[2].yards;
  //         } else if (val > 8 && val < 18) {
  //           inTotal += i.teeBoxes[2].yards;
  //         }
  //         $(`.yardsOut`).html(outTotal);
  //         $(`.yardsIn`).html(inTotal);
  //       }
  //     });
  //     $(`.totalsYards`).html(outTotal + inTotal);
  //     outTotal = 0;
  //     intotal = 0;
  //   }
  // }

}
