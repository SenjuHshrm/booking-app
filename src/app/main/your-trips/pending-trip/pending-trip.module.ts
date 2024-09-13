import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PendingTripRoutingModule } from './pending-trip-routing.module';
import { PendingTripComponent } from './pending-trip.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule } from '@angular/forms';
import { GlobalsModule } from 'src/app/globals/globals.module';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [PendingTripComponent],
  imports: [
    CommonModule,
    PendingTripRoutingModule,
    MatIconModule,
    MatMenuModule,
    FormsModule,
    GlobalsModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
})
export class PendingTripModule {}
