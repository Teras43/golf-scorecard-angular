import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DataShareService } from 'src/app/services/data-share.service';

@Component({
  selector: 'app-scorecard',
  templateUrl: './scorecard.component.html',
  styleUrls: ['./scorecard.component.scss']
})
export class ScorecardComponent implements OnInit {
  public data = undefined;
  players = this.getData.players;
  outTotal = 0;
  inTotal = 0;

  @ViewChild("teeDropDown") dropDownElem: ElementRef;

  constructor(
    private getData: DataShareService
  ) { }

  ngOnInit(): void {
    this.data = this.getData.getData();
    console.log(this.data)
  }

  getTeeYardage = (): any => {
    if (this.dropDownElem.nativeElement.value === "pro") {
      this.data.holes.forEach((i, val) => {
        if (i.teeBoxes[3] !== undefined) {
          if (val < 9) {
            this.outTotal += i.teeBoxes[0].yards;
          } else if (val > 8 && val < 18) {
            this.inTotal += i.teeBoxes[0].yards;
          }
          
        }
      });
      $(`.totalsYards`).html(outTotal + inTotal);
      outTotal = 0;
      inTotal = 0;
    } else if (this.dropDownElem.nativeElement.value === "champ") {
      this.data.data.holes.forEach((i, val) => {
        if (i.teeBoxes[3] !== undefined) {
          $(`.yardsHole${val + 1}`).html(i.teeBoxes[1].yards);
          if (val < 9) {
            outTotal += i.teeBoxes[1].yards;
          } else if (val > 8 && val < 18) {
            inTotal += i.teeBoxes[1].yards;
          }
          $(`.yardsOut`).html(outTotal);
          $(`.yardsIn`).html(inTotal);
        } else {
          $(`.yardsHole${val + 1}`).html(i.teeBoxes[0].yards);
          if (val < 9) {
            outTotal += i.teeBoxes[0].yards;
          } else if (val > 8 && val < 18) {
            inTotal += i.teeBoxes[0].yards;
          }
          $(`.yardsOut`).html(outTotal);
          $(`.yardsIn`).html(inTotal);
        }
      });
      $(`.totalsYards`).html(outTotal + inTotal);
      outTotal = 0;
      intotal = 0;
    } else if (teeList.value === "men") {
      singleCourse.data.holes.forEach((i, val) => {
        if (i.teeBoxes[3] !== undefined) {
          $(`.yardsHole${val + 1}`).html(i.teeBoxes[2].yards);
          if (val < 9) {
            outTotal += i.teeBoxes[2].yards;
          } else if (val > 8 && val < 18) {
            inTotal += i.teeBoxes[2].yards;
          }
          $(`.yardsOut`).html(outTotal);
          $(`.yardsIn`).html(inTotal);
        } else {
          $(`.yardsHole${val + 1}`).html(i.teeBoxes[1].yards);
          if (val < 9) {
            outTotal += i.teeBoxes[1].yards;
          } else if (val > 8 && val < 18) {
            inTotal += i.teeBoxes[1].yards;
          }
          $(`.yardsOut`).html(outTotal);
          $(`.yardsIn`).html(inTotal);
        }
      });
      $(`.totalsYards`).html(outTotal + inTotal);
      outTotal = 0;
      intotal = 0;
    } else if (teeList.value === "women") {
      singleCourse.data.holes.forEach((i, val) => {
        if (i.teeBoxes[3] !== undefined) {
          $(`.yardsHole${val + 1}`).html(i.teeBoxes[3].yards);
          if (val < 9) {
            outTotal += i.teeBoxes[3].yards;
          } else if (val > 8 && val < 18) {
            inTotal += i.teeBoxes[3].yards;
          }
          $(`.yardsOut`).html(outTotal);
          $(`.yardsIn`).html(inTotal);
        } else {
          $(`.yardsHole${val + 1}`).html(i.teeBoxes[2].yards);
          if (val < 9) {
            outTotal += i.teeBoxes[2].yards;
          } else if (val > 8 && val < 18) {
            inTotal += i.teeBoxes[2].yards;
          }
          $(`.yardsOut`).html(outTotal);
          $(`.yardsIn`).html(inTotal);
        }
      });
      $(`.totalsYards`).html(outTotal + inTotal);
      outTotal = 0;
      intotal = 0;
    }
  }

}
