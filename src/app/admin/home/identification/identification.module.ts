import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IdentificationRoutingModule } from './identification-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { IdentificationComponent } from './identification.component';


@NgModule({
  declarations: [
    IdentificationComponent
  ],
  imports: [
    CommonModule,
    IdentificationRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatMenuModule
  ]
})
export class IdentificationModule { }
