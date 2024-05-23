import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProprietorTableRoutingModule } from './proprietor-table-routing.module';
import { ProprietorTableComponent } from './proprietor-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';



@NgModule({
  declarations: [
    ProprietorTableComponent
  ],
  imports: [
    CommonModule,
    ProprietorTableRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatMenuModule
  ]
})
export class ProprietorTableModule { }
