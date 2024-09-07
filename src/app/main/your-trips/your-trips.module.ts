import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { YourTripsRoutingModule } from './your-trips-routing.module';
import { YourTripsComponent } from './your-trips.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule } from '@angular/forms';
import { ValidationModalComponent } from './modal/validation-modal/validation-modal.component';
import { GlobalsModule } from "../../globals/globals.module";
import { ViewDetailsModalComponent } from './modal/view-details-modal/view-details-modal.component';
import { CancelReasonModalComponent } from './modal/cancel-reason-modal/cancel-reason-modal.component';


@NgModule({
  declarations: [
    YourTripsComponent, 
    ValidationModalComponent, ViewDetailsModalComponent, CancelReasonModalComponent, 
  ],
  imports: [
    CommonModule,
    YourTripsRoutingModule,
    MatIconModule,
    MatMenuModule,
    FormsModule,
    GlobalsModule
]
})
export class YourTripsModule { }
