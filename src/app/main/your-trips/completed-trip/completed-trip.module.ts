import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompletedTripRoutingModule } from './completed-trip-routing.module';
import { CompletedTripComponent } from './completed-trip.component';
import { FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { GlobalsModule } from 'src/app/globals/globals.module';

@NgModule({
  declarations: [CompletedTripComponent],
  imports: [
    CommonModule,
    CompletedTripRoutingModule,
    MatIconModule,
    MatMenuModule,
    FormsModule,
    MatProgressSpinnerModule,
    GlobalsModule,
  ],
})
export class CompletedTripModule {}
