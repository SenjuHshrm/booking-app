import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'maskCard'
})
export class MaskCardPipe implements PipeTransform {

  transform(cardNumber: any): any {
    if (!cardNumber) return '';
    const visibleDigits = 4; // Number of visible digits at the end
    const hiddenPart = cardNumber.slice(0, -visibleDigits).replace(/\d/g, '*');
    const visiblePart = cardNumber.slice(-visibleDigits);
    return hiddenPart + visiblePart;
  }

}