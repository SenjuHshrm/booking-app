import { MainComponent } from './main.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { GlobalsModule } from './../globals/globals.module';
import { NotificationPageComponent } from './notification-page/notification-page.component';
import { WishListComponent } from './wish-list/wish-list.component';






@NgModule({

  declarations: [
    MainComponent
  ],

  imports: [
    CommonModule,
    MainRoutingModule,
    MatIconModule,
    GlobalsModule
  ],

 




})
export class MainModule { }
