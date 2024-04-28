import { GlobalsModule } from './../globals/globals.module';
import { NgModule  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { NavComponent } from '../globals/nav/nav.component';
import { MatIconModule } from '@angular/material/icon';
import { GalleryPageComponent } from './gallery-page/gallery-page.component';





@NgModule({

  declarations: [

  ],

  imports: [
    CommonModule,
    MainRoutingModule,
    MatIconModule,
    GlobalsModule
  ],

 




})
export class MainModule { }
