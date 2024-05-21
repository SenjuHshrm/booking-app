import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GlobalStaticsRoutingModule } from './global-statics-routing.module';
import { GlobalStaticsComponent } from './global-statics.component';


@NgModule({
  declarations: [
    GlobalStaticsComponent
  ],
  imports: [
    CommonModule,
    GlobalStaticsRoutingModule
  ]
})
export class GlobalStaticsModule { }
