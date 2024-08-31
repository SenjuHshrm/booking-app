import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodayRoutingModule } from './today-routing.module';
import { TodayComponent } from './today.component';
import { ComponentsModule } from './components/components.module';
import {MatTabsModule} from '@angular/material/tabs';





@NgModule({
  declarations: [
    TodayComponent
  ],
  imports: [
    CommonModule,
    TodayRoutingModule,
    MatTabsModule,
    ComponentsModule
  

    
  ]
})
export class TodayModule { }
