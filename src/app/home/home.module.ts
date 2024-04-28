import { GlobalsModule } from './../globals/globals.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { FooterComponent } from '../globals/footer/footer.component';
import { NavComponent } from '../globals/nav/nav.component';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    GlobalsModule
  ],



})
export class HomeModule { }
