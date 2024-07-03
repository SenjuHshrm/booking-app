import { StaycationListModule } from './staycation-list/staycation-list.module';
import { MainComponent } from './main.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { GlobalsModule } from './../globals/globals.module';






@NgModule({

  declarations: [
    MainComponent
  ],

  imports: [
    CommonModule,
    MainRoutingModule,
    MatIconModule,
    GlobalsModule,
    StaycationListModule
  ],

})
export class MainModule { }
