import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentChangeAction } from '@angular/fire/firestore';
import { Players } from '../interfaces';
import { from, Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AngularFireService {
  players: Observable<any>;
  gameData = [];
  private playersRef: AngularFirestoreCollection<Players>;

  constructor(
    private db: AngularFirestore,
  ) { 
    this.playersRef = this.db.collection<Players>('saved-games');
    this.players = this.playersRef.valueChanges();
  }
  gameId: string

  private errorHandler(error) {
    console.log(error);
    return throwError(error);
  }

  getPlayersObservable = (): Observable<Players[]> => {
    return this.playersRef.snapshotChanges()
    .pipe(
      map((items: DocumentChangeAction<Players>[]): Players[] => {
        return items.map((item: DocumentChangeAction<Players>): Players => {
          return {
            name: item.payload.doc.data().name,
            score: item.payload.doc.data().score
          };
        });
      }),
      catchError(this.errorHandler)
      )
  }

  getAllPlayers = async (): Promise<any> => {
    await this.db.collection("saved-games").get().toPromise().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        return this.gameData.push(doc.data());
      });
  });
    // let allPlayers;
    // allPlayers = this.db.collection('saved-games').ref.get();
    // allPlayers.forEach(player => {
    //   console.log(player);
    // })
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
