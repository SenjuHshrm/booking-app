import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelpCenterRoutingModule } from './help-center-routing.module';
import { HelpCenterComponent } from './help-center.component';
import { GlobalsModule } from '../globals/globals.module';


@NgModule({
  declarations: [
    HelpCenterComponent
  ],
  imports: [
    CommonModule,
    HelpCenterRoutingModule,
    GlobalsModule
  ]
})
export class HelpCenterModule { }
