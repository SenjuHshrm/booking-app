import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupportingDocsRoutingModule } from './supporting-docs-routing.module';
import { SupportingDocsComponent } from './supporting-docs.component';


@NgModule({
  declarations: [
    SupportingDocsComponent
  ],
  imports: [
    CommonModule,
    SupportingDocsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ]
})
export class SupportingDocsModule { }
