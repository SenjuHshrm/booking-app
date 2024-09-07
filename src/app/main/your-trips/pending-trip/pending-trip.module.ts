import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PendingTripRoutingModule } from './pending-trip-routing.module';
import { PendingTripComponent } from './pending-trip.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [PendingTripComponent],
  imports: [
    CommonModule,
    PendingTripRoutingModule,
    MatIconModule,
    MatMenuModule,
    FormsModule
  ]
})
export class PendingTripModule { }
