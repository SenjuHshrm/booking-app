import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CancelledTripRoutingModule } from './cancelled-trip-routing.module';
import { CancelledTripComponent } from './cancelled-trip.component';
import { FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { GlobalsModule } from 'src/app/globals/globals.module';

@NgModule({
  declarations: [CancelledTripComponent],
  imports: [
    CommonModule,
    CancelledTripRoutingModule,
    MatIconModule,
    MatMenuModule,
    FormsModule,
    MatProgressSpinnerModule,
    GlobalsModule,
  ],
})
export class CancelledTripModule {}
