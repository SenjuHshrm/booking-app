import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaycationDetailsRoutingModule } from './staycation-details-routing.module';
import { StaycationDetailsComponent } from './staycation-details.component';
import { MatIconModule } from '@angular/material/icon';






@NgModule({
  declarations: [
    StaycationDetailsComponent
  ],
  imports: [
    CommonModule,
    StaycationDetailsRoutingModule,
    MatIconModule
  ]
})
export class StaycationDetailsModule { }
