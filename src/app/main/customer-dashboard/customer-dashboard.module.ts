import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerDashboardRoutingModule } from './customer-dashboard-routing.module';
import { CustomerDashboardComponent } from './customer-dashboard.component';


@NgModule({
  declarations: [
    CustomerDashboardComponent,
  ],
  imports: [
    CommonModule,
    CustomerDashboardRoutingModule,
  ]
})
export class CustomerDashboardModule { }
