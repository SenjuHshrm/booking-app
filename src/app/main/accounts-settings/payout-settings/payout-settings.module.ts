import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PayoutSettingsRoutingModule } from './payout-settings-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PayoutSettingsComponent } from './payout-settings.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { CreatePayoutMethodComponent } from './create-payout-method/create-payout-method.component';
import { GlobalsModule } from 'src/app/globals/globals.module';




@NgModule({
  declarations: [
    PayoutSettingsComponent, 
    CreatePayoutMethodComponent, 
  ],
  imports: [
    CommonModule,
    PayoutSettingsRoutingModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatMenuModule,
    MatFormFieldModule,
    GlobalsModule
  ]
})
export class PayoutSettingsModule { }
