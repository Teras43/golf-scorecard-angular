import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Players } from '../interfaces';

type TeeTypes = {
  "pro": number,
  "champion": number,
  "men": number,
  "women": number
}

@Injectable({
  providedIn: 'root'
})
export class DataShareService {
  public data:any = undefined;
  players: Players[] = [];
  holeToIndex: TeeTypes = {} as TeeTypes;

  constructor(
    private router: Router
  ) { }

  setData = (data: any): any => {
    this.data = data;
  }

  getData = () => {
    return this.data;
  }

  getYardage = (type: "pro" | "champion" | "men" | "women"): string => {
    const index = this.holeToIndex[type]
    if (index === undefined ) return "N/A"
    let total = 0
    this.data.holes.forEach(v => total += v.teeBoxes[index].yards)
    return total.toString()
  }

  goHome = () => {
    this.router.navigate([''])
    .then(() => {
      window.location.reload();
    });
  }
}
