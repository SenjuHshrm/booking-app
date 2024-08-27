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
import { ViewVerificationComponent } from './view-verification/view-verification.component';
import { ApproveDisapproveComponent } from './approve-disapprove/approve-disapprove.component';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    IdentificationComponent,
    ViewVerificationComponent,
    ApproveDisapproveComponent,
  ],
  imports: [
    CommonModule,
    IdentificationRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
  ],
})
export class IdentificationModule {}
