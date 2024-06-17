import { MatDialogModule } from '@angular/material/dialog';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecuritySettingsRoutingModule } from './security-settings-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { SecuritySettingsComponent } from './security-settings.component';
import { SecuritySettingsModalComponent } from './component/security-settings-modal/security-settings-modal.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar'


@NgModule({
  declarations: [
     SecuritySettingsComponent,
     SecuritySettingsModalComponent
  ],
  imports: [
    CommonModule,
    SecuritySettingsRoutingModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  providers: [
    MatSnackBarModule
  ]
})
export class SecuritySettingsModule { }
