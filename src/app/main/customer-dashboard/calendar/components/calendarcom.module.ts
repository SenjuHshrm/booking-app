import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PriceComponent } from './price/price.component';
import { AvailabilityComponent } from './availability/availability.component';



@NgModule({
  declarations: [
    PriceComponent,
    AvailabilityComponent
  ],
  imports: [
    CommonModule
  ],

  exports:[
    PriceComponent,
    AvailabilityComponent
  ]
})
export class CalendarcomModule { }
