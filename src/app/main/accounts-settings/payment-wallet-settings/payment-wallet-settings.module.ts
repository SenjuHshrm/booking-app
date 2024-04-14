import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentWalletSettingsRoutingModule } from './payment-wallet-settings-routing.module';
import { PaymentWalletSettingsComponent } from './payment-wallet-settings.component';


@NgModule({
  declarations: [PaymentWalletSettingsComponent],
  imports: [
    CommonModule,
    PaymentWalletSettingsRoutingModule
  ]
})
export class PaymentWalletSettingsModule { }
