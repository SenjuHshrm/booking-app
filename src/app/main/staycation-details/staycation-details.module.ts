import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaycationDetailsRoutingModule } from './staycation-details-routing.module';
import { StaycationDetailsComponent } from './staycation-details.component';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SwiperModule } from 'swiper/angular';
import { MatDialogModule } from '@angular/material/dialog';





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
    SwiperModule,
    MatDialogModule
  ]
})
export class StaycationDetailsModule { }
