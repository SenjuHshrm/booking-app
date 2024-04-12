import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ProfileComponent } from './profile/profile.component';
import { AccountComponent } from './account/account.component';
import { MyFavoriteComponent } from './my-favorite/my-favorite.component';





@NgModule({


  declarations: [
    ProfileComponent,
    AccountComponent,
    MyFavoriteComponent,
  ],

  imports: [
    CommonModule,
    MatIconModule
  ],


  exports: [
    ProfileComponent
  ]


})
export class GlobalsModule { }
