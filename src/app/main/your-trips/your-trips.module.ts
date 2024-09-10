import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { YourTripsRoutingModule } from './your-trips-routing.module';
import { YourTripsComponent } from './your-trips.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule } from '@angular/forms';
import { GlobalsModule } from "../../globals/globals.module";
import { ViewDetailsModalComponent } from '../../globals/modals/view-details-modal/view-details-modal.component';
import { CancelReasonModalComponent } from './modal/cancel-reason-modal/cancel-reason-modal.component';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';

@NgModule({
  declarations: [
    YourTripsComponent, 
    ViewDetailsModalComponent, CancelReasonModalComponent, 
  ],
  imports: [
    CommonModule,
    YourTripsRoutingModule,
    MatIconModule,
    MatMenuModule,
    FormsModule,
    MatButtonModule,
    MatSidenavModule,
    GlobalsModule
]
})
export class YourTripsModule { }
