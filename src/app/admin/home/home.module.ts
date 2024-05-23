import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MatIconModule } from '@angular/material/icon';
import { GlobalsModule } from 'src/app/globals/globals.module';
import { MatMenuModule } from '@angular/material/menu';


@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatIconModule,
    GlobalsModule,
    MatMenuModule
  ]
})
export class HomeModule { }
