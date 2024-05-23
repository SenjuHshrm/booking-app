import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminTableRoutingModule } from './admin-table-routing.module';
import { AdminTableComponent } from './admin-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { CreateAdminComponent } from './create-admin/create-admin.component';



@NgModule({
  declarations: [
    AdminTableComponent,
    CreateAdminComponent
  ],
  imports: [
    CommonModule,
    AdminTableRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatMenuModule
  ]
})
export class AdminTableModule { }
