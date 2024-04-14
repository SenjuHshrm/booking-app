import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ProfileComponent } from './profile/profile.component';
import { MyFavoriteComponent } from './my-favorite/my-favorite.component';
import { CreateListingComponent } from './create-listing/create-listing.component';





@NgModule({


  declarations: [
    ProfileComponent,
    MyFavoriteComponent,
    CreateListingComponent,
  ],

  imports: [
    CommonModule,
    MatIconModule
  ],


  exports: [
    ProfileComponent,
    CreateListingComponent
  ]


})
export class GlobalsModule { }
