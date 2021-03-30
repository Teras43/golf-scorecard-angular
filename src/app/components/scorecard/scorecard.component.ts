import { Component, OnInit } from '@angular/core';
import { DataShareService } from 'src/app/services/data-share.service';

@Component({
  selector: 'app-scorecard',
  templateUrl: './scorecard.component.html',
  styleUrls: ['./scorecard.component.scss']
})
export class ScorecardComponent implements OnInit {
  public data = undefined;
  players = this.getData.players;

  constructor(
    private getData: DataShareService
  ) { }

  ngOnInit(): void {
    this.data = this.getData.getData();
    console.log(this.data)
  }

}
