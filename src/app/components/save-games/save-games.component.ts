import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Players } from '../../interfaces';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AngularFireService } from '../../services/angular-fire.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-save-games',
  templateUrl: './save-games.component.html',
  styleUrls: ['./save-games.component.scss']
})
export class SaveGamesComponent implements OnInit {
  public players$: Observable<Players[]>;
  players: Players[];
  player: Players;

  constructor(
      private http: HttpClient,
      private db: AngularFirestore,
      private route: ActivatedRoute,
      private playersService: AngularFireService,
    ) { }

  ngOnInit(): void {
    // this.players = this.playersService.players;
    // this.player = this.players.find(player => player.id === this.route.snapshot.params['id']);
    // console.log(this.players);

    // this.playersService.getPlayersObservable(this.player.id);
  }
}
