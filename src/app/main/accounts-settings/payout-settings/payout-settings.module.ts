import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PayoutSettingsRoutingModule } from './payout-settings-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PayoutSettingsComponent } from './payout-settings.component';


@NgModule({
  declarations: [PayoutSettingsComponent],
  imports: [
    CommonModule,
    PayoutSettingsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule
  ]
})
export class PayoutSettingsModule { }
