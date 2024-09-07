import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompletedTripRoutingModule } from './completed-trip-routing.module';
import { CompletedTripComponent } from './completed-trip.component';
import { FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [CompletedTripComponent],
  imports: [
    CommonModule,
    CompletedTripRoutingModule,
    MatIconModule,
    MatMenuModule,
    FormsModule
  ]
})
export class CompletedTripModule { }
