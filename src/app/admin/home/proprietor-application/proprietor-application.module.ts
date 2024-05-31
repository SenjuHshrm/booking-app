import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProprietorApplicationRoutingModule } from './proprietor-application-routing.module';
import { ProprietorApplicationComponent } from './proprietor-application.component';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    ProprietorApplicationComponent
  ],
  imports: [
    CommonModule,
    ProprietorApplicationRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule
  ]
})
export class ProprietorApplicationModule { }
