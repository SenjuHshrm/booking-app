import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaycationListRoutingModule } from './staycation-list-routing.module';
import { StaycationListComponent } from './staycation-list.component';
import { MatIconModule } from '@angular/material/icon';
import { StaycationlistAddguestModalComponent } from './component/staycationlist-addguest-modal/staycationlist-addguest-modal.component';
import { StaycationlistLocationModalComponent } from './component/staycationlist-location-modal/staycationlist-location-modal.component';
import { SwiperModule } from 'swiper/angular';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    StaycationListComponent,
    StaycationlistAddguestModalComponent,
    StaycationlistLocationModalComponent,
  ],
  imports: [
    CommonModule,
    StaycationListRoutingModule,
    MatIconModule,
    SwiperModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatSnackBarModule,
  ],
})
export class StaycationListModule {}
