import { Component } from '@angular/core';

@Component({
  selector: 'app-step9',
  templateUrl: './step9.component.html',
  styleUrls: ['./step9.component.scss']
})
export class Step9Component {
  adddiscounts:any=[
    {label:20, desc:'Offer 20% off your first 3 bookings'},
    {label:30, desc:'For stays of 7 nights or more'},
    {label:50, desc:'For stays of 28 nights or more'},
  ]

}
