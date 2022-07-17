import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nameOutput'
})
export class NameOutputPipe implements PipeTransform {

  transform(value: string, ...args: string [] | number[]): string {
    value = value + ' ' + args[0];
    if (value.length > args[1]) {
      return value.substring(0, +args[1]) + '...';
    }
    return value;
  }

}
