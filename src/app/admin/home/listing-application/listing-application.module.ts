import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListingApplicationRoutingModule } from './listing-application-routing.module';
import { ListingApplicationComponent } from './listing-application.component';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [ListingApplicationComponent],
  imports: [
    CommonModule,
    ListingApplicationRoutingModule,
    MatIconModule,
    MatPaginatorModule,
    MatTableModule,
    MatMenuModule,
  ],
})
export class ListingApplicationModule {}
