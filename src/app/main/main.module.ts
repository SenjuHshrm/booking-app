import { NgModule  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { StaycationListComponent } from './staycation-list/staycation-list.component';
import { SearchFiltersComponent } from '../globals/search-filters/search-filters.component';
import { MatIconModule } from '@angular/material/icon';
import { SearchFiltersAddguestComponent } from '../globals/search-filters/search-filters-modal/search-filters-addguest/search-filters-addguest.component';
import { SearchFiltersLocationsComponent } from '../globals/search-filters/search-filters-modal/search-filters-locations/search-filters-locations.component';
import { StaycationDetailsComponent } from './staycation-details/staycation-details.component';
import { BookStaycationComponent } from './book-staycation/book-staycation.component';







@NgModule({

  declarations: [
   StaycationListComponent,
   StaycationDetailsComponent,
   SearchFiltersComponent,
   SearchFiltersAddguestComponent,
   SearchFiltersLocationsComponent,
   BookStaycationComponent
  ],

  imports: [
    CommonModule,
    MainRoutingModule,
    MatIconModule
  ],

 




})
export class MainModule { }
