

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormat'
})
export class TimeFormatPipe implements PipeTransform {

  transform(value: any): string {
    const hours = value; // hours
    const minutes = value; // minutes

    if (hours === '0' && minutes === '0') {

      return 'No remaining time'; 

    }else{

    let result = '';

    if (hours > 0) {
      result += `${hours} hr${hours > 1 ? 's' : ''}`;
    }
    if (minutes > 0) {
      if (result.length > 0) {
        result += ' ';
      }
      result += `${minutes} min${minutes > 1 ? 's' : ''}`;
    }
    return result;
  }
}
}