import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuestTableRoutingModule } from './guest-table-routing.module';
import { GuestTableComponent } from './guest-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';



@NgModule({
  declarations: [
    GuestTableComponent
  ],
  imports: [
    CommonModule,
    GuestTableRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatMenuModule
  ]
})
export class GuestTableModule { }
