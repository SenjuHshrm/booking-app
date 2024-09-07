import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CancelledTripRoutingModule } from './cancelled-trip-routing.module';
import { CancelledTripComponent } from './cancelled-trip.component';
import { FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [CancelledTripComponent],
  imports: [
    CommonModule,
    CancelledTripRoutingModule,
    MatIconModule,
    MatMenuModule,
    FormsModule
  ]
})
export class CancelledTripModule { }
