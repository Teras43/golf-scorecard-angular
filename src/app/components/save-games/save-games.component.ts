import { Component, OnInit } from '@angular/core';
import { Players } from '../../interfaces';
import { Observable } from 'rxjs';
import { AngularFireService } from '../../services/angular-fire.service';
import { PlayerTableInterface } from 'src/app/interfaces';
import { SelectionModel } from '@angular/cdk/collections';

const TABLE_DATA: PlayerTableInterface[] = [

];

@Component({
  selector: 'app-save-games',
  templateUrl: './save-games.component.html',
  styleUrls: ['./save-games.component.scss']
})
export class SaveGamesComponent implements OnInit {
  public players$: Observable<Players[]>;
  gameData;
  displayedColumns: string[] = ['position', 'players', 'totalScore'];
  dataSource = TABLE_DATA;
  selection = new SelectionModel<PlayerTableInterface>(true, []);
  positionNum = 1;

  constructor(
      private playersService: AngularFireService,
    ) { }

  ngOnInit(): void {
    let playerScores;
    let players1;
    let players2;
    let players3;
    let players4;
    this.playersService.players.subscribe(data => {
      this.gameData = data;
      this.gameData.forEach(game => {
        players1 = game.players[0];
        players2 = game.players[1];
        players3 = game.players[2];
        players4 = game.players[3];
          if (game.players.length === 1) {
            playerScores = `${players1.name}: ${players1.score.total}`
          }
          if (game.players.length === 2) {
            playerScores = `${players1.name}: ${players1.score.total} - ${players2.name}: ${players2.score.total}`
          }
          if (game.players.length === 3) {
            playerScores = `${players1.name}: ${players1.score.total} - ${players2.name}: ${players2.score.total} - ${players3.name}: ${players3.score.total}`
          }
          if (game.players.length === 4) {
            playerScores = `${players1.name}: ${players1.score.total} - ${players2.name}: ${players2.score.total} - ${players3.name}: ${players3.score.total} - ${players4.name}: ${players4.score.total}`
          }
        TABLE_DATA.push({'position': this.positionNum, 'players': game.players.length, 'totalScore': `${playerScores}`})
        this.positionNum += 1
      })
    });
  }

  isLoaded = (): boolean => {
    if (this.dataSource.length === 0) {
      return false;
    } else {
      return true;
    }
  }
  
}
