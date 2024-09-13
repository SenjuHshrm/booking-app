import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpcomingTripRoutingModule } from './upcoming-trip-routing.module';
import { UpcomingTripComponent } from './upcoming-trip.component';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { GlobalsModule } from 'src/app/globals/globals.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [UpcomingTripComponent],
  imports: [
    CommonModule,
    UpcomingTripRoutingModule,
    MatIconModule,
    FormsModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    GlobalsModule,
    MatButtonModule,
  ],
})
export class UpcomingTripModule {}
