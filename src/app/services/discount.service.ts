import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {

  public discounts: any = [
    {
      value: 'discount_0',
      desc: 'No discount'
    },
    {
      value: 'discount_1',
      desc: 'Offer discounts for first 3 bookings.'
    },
    {
      value: 'discount_2',
      desc: 'For stays of 7 nights or more.'
    },
    {
      value: 'discount_3',
      desc: 'For stays of 28 nights or more.'
    }
  ]

  constructor() { }

  public calculateDiscount(totalBeforeTax: number, dscVal: number, value: string, bookings: number, nights: number): number {
    let res: number = 0
    switch(value) {
      case 'discount_1':
        if(bookings <= 3) {
          res = totalBeforeTax * (dscVal / 100)
        }
        break;
      case 'discount_2':
        if(nights >= 7) {
          res = totalBeforeTax * (dscVal / 100)
        }
        break;
      case 'discount_3':
        if(nights >= 28) {
          res = totalBeforeTax * (dscVal / 100)
        }
        break;
      default:
        res = 0;
    }
    return res
  }

  
}
