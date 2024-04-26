import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { CreateListingComponent } from './create-listing/create-listing.component';


@NgModule({

  declarations: [
    CreateListingComponent
  ],

  imports: [
    CommonModule,
    MatIconModule
  ],


})
export class GlobalsModule { }
