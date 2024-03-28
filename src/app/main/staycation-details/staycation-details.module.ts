import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaycationDetailsRoutingModule } from './staycation-details-routing.module';
import { StaycationDetailsComponent } from './staycation-details.component';


@NgModule({
  declarations: [
    StaycationDetailsComponent
  ],
  imports: [
    CommonModule,
    StaycationDetailsRoutingModule
  ]
})
export class StaycationDetailsModule { }
