import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pluralize'
})
export class PluralizePipe implements PipeTransform {
  transform(value: any, unit: any): any {

    if (value === '1') {

      return `${value} ${unit}`;

    } else {

      console.log(value);
      return `${value} ${unit}s`;
    
    }
  }
}