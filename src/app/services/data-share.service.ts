import { Injectable } from '@angular/core';
import { Players } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataShareService {
  public data:any = undefined;
  players: Players[] = [];

  constructor() { }

  setData = (data: any): any => {
    this.data = data;
  }

  getData = () => {
    return this.data;
  }
}
