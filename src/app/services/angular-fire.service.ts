import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentChangeAction } from '@angular/fire/firestore';
import { Players } from '../interfaces';
import { from, Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AngularFireService {

  constructor(private db: AngularFirestore) {
  }
  gameId: string

  private errorHandler(error) {
    console.log(error);
    return throwError(error);
  }

  players: Players

  getPlayersObservable = (playerId: number): Observable<Players[]> => {
    const filteredPlayers = this.db.collection('saved-games', ref => ref.where('id', '==', playerId));
    return filteredPlayers.snapshotChanges().pipe(
      map((items: DocumentChangeAction<Players>[]): Players[] => {
        return items.map((item: DocumentChangeAction<Players>): Players => {
          return {
            name: item.payload.doc.data().name,
            score: item.payload.doc.data().score
          }
        })
      })
    )
  }

  savePlayer = (player: Players) => {
    this.db.collection('saved-games').add(player);
  }

  saveGame = (players: Players[]) => {
    this.db.collection('saved-games').add({players}).then(doc => this.gameId = doc.id)
  }

  updateGame = (players: Players[]) => {
    this.db.collection('saved-games').doc(this.gameId).set({players})
  }
}
