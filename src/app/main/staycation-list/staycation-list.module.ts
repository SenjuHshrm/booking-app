import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaycationListRoutingModule } from './staycation-list-routing.module';
import { StaycationListComponent } from './staycation-list.component';
import { MatIconModule } from '@angular/material/icon';
import { StaycationlistAddguestModalComponent } from './component/staycationlist-addguest-modal/staycationlist-addguest-modal.component';
import { StaycationlistLocationModalComponent } from './component/staycationlist-location-modal/staycationlist-location-modal.component';




@NgModule({
  declarations: [
  StaycationListComponent,
  StaycationlistAddguestModalComponent,
  StaycationlistLocationModalComponent
  ],
  imports: [
    CommonModule,
    StaycationListRoutingModule,
    MatIconModule
  ],



})
export class StaycationListModule { }
