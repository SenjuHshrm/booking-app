import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaycationListRoutingModule } from './staycation-list-routing.module';
import { StaycationListComponent } from './staycation-list.component';


@NgModule({
  declarations: [
    StaycationListComponent
  ],
  imports: [
    CommonModule,
    StaycationListRoutingModule
  ]
})
export class StaycationListModule { }
