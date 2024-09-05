import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GlobalsModule } from './../../../globals/globals.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProprietorApplicationRoutingModule } from './proprietor-application-routing.module';
import { ProprietorApplicationComponent } from './proprietor-application.component';
import { MatButtonModule } from '@angular/material/button';
import { ListingsComponent } from './listings/listings.component';
import { CheckListingInputComponent } from './check-listing-input/check-listing-input.component';
import { ValidationModalComponent } from './validation-modal/validation-modal.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    ProprietorApplicationComponent,
    ListingsComponent,
    CheckListingInputComponent,
    ValidationModalComponent,
  ],
  imports: [
    CommonModule,
    ProprietorApplicationRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
  ],
})
export class ProprietorApplicationModule {}
