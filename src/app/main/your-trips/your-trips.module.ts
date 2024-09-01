import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { YourTripsRoutingModule } from './your-trips-routing.module';
import { YourTripsComponent } from './your-trips.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule } from '@angular/forms';
import { ValidationModalComponent } from './validation-modal/validation-modal.component';


@NgModule({
  declarations: [YourTripsComponent, ValidationModalComponent],
  imports: [
    CommonModule,
    YourTripsRoutingModule,
    MatIconModule,
    MatMenuModule,
    FormsModule
  ]
})
export class YourTripsModule { }
