import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentWalletSettingsRoutingModule } from './payment-wallet-settings-routing.module';
import { PaymentWalletSettingsComponent } from './payment-wallet-settings.component';
import { CreatePaymentMethodComponent } from './create-payment-method/create-payment-method.component';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [PaymentWalletSettingsComponent, CreatePaymentMethodComponent],
  imports: [
    CommonModule,
    PaymentWalletSettingsRoutingModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule
  ]
})
export class PaymentWalletSettingsModule { }
