import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpdateListingRoutingModule } from './update-listing-routing.module';
import { UpdateListingComponent } from './update-listing.component';
import { MatIconModule } from '@angular/material/icon';
import { SwiperModule } from 'swiper/angular';
import { YourSpaceComponent } from './your-space/your-space.component';
import { ArrivalGuideComponent } from './arrival-guide/arrival-guide.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UpdateListingComponent,
    YourSpaceComponent,
    ArrivalGuideComponent
  ],
  imports: [
    CommonModule,
    UpdateListingRoutingModule,
    MatIconModule,
    SwiperModule,
    FormsModule
  ]
})
export class UpdateListingModule { }
