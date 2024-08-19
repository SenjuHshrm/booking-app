import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaycationDetailsRoutingModule } from './staycation-details-routing.module';
import { StaycationDetailsComponent } from './staycation-details.component';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SwiperModule } from 'swiper/angular';
import { MatDialogModule } from '@angular/material/dialog';
import { CustomDatepickerHeader } from './custom-datepicker-header';





@NgModule({
  declarations: [
    StaycationDetailsComponent,
    CustomDatepickerHeader
  ],
  imports: [
    CommonModule,
    StaycationDetailsRoutingModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    SwiperModule,
    MatDialogModule,
    MatDatepickerModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class StaycationDetailsModule { }
