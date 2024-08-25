import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountsSettingsRoutingModule } from './accounts-settings-routing.module';
import { AccountsSettingsComponent } from './accounts-settings.component';
import { AccountVerificationComponent } from './account-verification/account-verification.component';
import { PaymentAndPayoutComponent } from './payment-and-payout/payment-and-payout.component';

@NgModule({
  declarations: [AccountsSettingsComponent, PaymentAndPayoutComponent],
  imports: [CommonModule, AccountsSettingsRoutingModule],
})
export class AccountsSettingsModule {}
