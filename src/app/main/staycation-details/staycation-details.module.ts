import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaycationDetailsRoutingModule } from './staycation-details-routing.module';
import { StaycationDetailsComponent } from './staycation-details.component';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';






@NgModule({
  declarations: [
    StaycationDetailsComponent
  ],
  imports: [
    CommonModule,
    StaycationDetailsRoutingModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class StaycationDetailsModule { }
