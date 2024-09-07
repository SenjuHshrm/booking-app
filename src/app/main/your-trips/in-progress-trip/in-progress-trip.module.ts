import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InProgressTripRoutingModule } from './in-progress-trip-routing.module';
import { InProgressTripComponent } from './in-progress-trip.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [InProgressTripComponent],
  imports: [
    CommonModule,
    InProgressTripRoutingModule,
    MatIconModule,
    MatMenuModule,
    FormsModule
  ]
})
export class InProgressTripModule { }
