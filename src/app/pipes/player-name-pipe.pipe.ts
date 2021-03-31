import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'playerNamePipe'
})
export class PlayerNamePipePipe implements PipeTransform {
  duplicateNum = 2;

  transform(value: string, ...args: unknown[]): string {
    const newValue = value + "(" + this.duplicateNum + ")";
    this.duplicateNum++;
    return newValue;
  }

}
