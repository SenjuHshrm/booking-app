import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'maskCard'
})
export class MaskCardPipe implements PipeTransform {

  transform(value: string, visibleDigits: number = 4): string {
    if (!value) return value;
    
    const maskedSection = value.slice(0, -visibleDigits).replace(/\d/g, '*');
    const visibleSection = value.slice(-visibleDigits);
    
    return `${maskedSection}${visibleSection}`;
  }

}
