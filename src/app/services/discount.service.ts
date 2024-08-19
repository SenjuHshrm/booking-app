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

  
}
