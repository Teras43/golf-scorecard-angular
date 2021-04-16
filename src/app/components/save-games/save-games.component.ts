import { Component, OnInit } from '@angular/core';
import { Players } from '../../interfaces';
import { Observable } from 'rxjs';
import { AngularFireService } from '../../services/angular-fire.service';
import { PlayerTableInterface } from 'src/app/interfaces';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { variable } from '@angular/compiler/src/output/output_ast';

const TABLE_DATA: PlayerTableInterface[] = [

];

@Component({
  selector: 'app-save-games',
  templateUrl: './save-games.component.html',
  styleUrls: ['./save-games.component.scss']
})
export class SaveGamesComponent implements OnInit {
  public players$: Observable<Players[]>;
  displayedColumns: string[] = ['select', 'gameId', 'position', 'players', 'totalScore'];
  dataSource = new MatTableDataSource<PlayerTableInterface>(TABLE_DATA);
  selection = new SelectionModel<PlayerTableInterface>(true, []);
  positionNum = 1;
  deleteIds = [];

  constructor(
      private playersService: AngularFireService,
    ) { }

  ngOnInit(): void {
    let gameId;
    let playerScores;
    let players1;
    let players2;
    let players3;
    let players4;
    this.playersService.getAllPlayers().then(() => {
      this.playersService.gameData.forEach(game => {
        gameId = game.id;
        players1 = game.data.players[0];
        players2 = game.data.players[1];
        players3 = game.data.players[2];
        players4 = game.data.players[3];
          if (game.data.players.length === 1) {
            playerScores = `${players1.name}: ${players1.score.total}`
          }
          if (game.data.players.length === 2) {
            playerScores = `${players1.name}: ${players1.score.total} - ${players2.name}: ${players2.score.total}`
          }
          if (game.data.players.length === 3) {
            playerScores = `${players1.name}: ${players1.score.total} - ${players2.name}: ${players2.score.total} - ${players3.name}: ${players3.score.total}`
          }
          if (game.data.players.length === 4) {
            playerScores = `${players1.name}: ${players1.score.total} - ${players2.name}: ${players2.score.total} - ${players3.name}: ${players3.score.total} - ${players4.name}: ${players4.score.total}`
          }
        TABLE_DATA.push({'gameId': `${gameId}`, 'position': this.positionNum, 'players': game.data.players.length, 'totalScore': `${playerScores}`})
        this.positionNum += 1
      });
    });
  }

  deleteSelectedFn = () => {
    if (this.selection.selected.length !== 0) {
      this.selection.selected.forEach(selection => {
        this.deleteIds.push(selection.gameId);
      });
      this.playersService.deleteSelected(this.deleteIds);
      this.deleteIds.forEach(id => {
        let index = this.deleteIds.indexOf(id);
        this.deleteIds.slice(index, 1)
      });
    } else {
      return;
    }
  }

  isAllSelected = () => {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  };

  masterToggle = () => {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  };

  checkboxLabel = (row?: PlayerTableInterface): string => {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  };

  isLoaded = (): boolean => {
    if (this.dataSource.data.length === 0) {
      return false;
    } else {
      return true;
    }
  };
  
}
