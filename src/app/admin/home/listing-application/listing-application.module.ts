import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListingApplicationRoutingModule } from './listing-application-routing.module';
import { ListingApplicationComponent } from './listing-application.component';


@NgModule({
  declarations: [
    ListingApplicationComponent
  ],
  imports: [
    CommonModule,
    ListingApplicationRoutingModule
  ]
})
export class ListingApplicationModule { }
