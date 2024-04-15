import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-accounts-settings',
  templateUrl: './accounts-settings.component.html',
  styleUrls: ['./accounts-settings.component.scss']
})
export class AccountsSettingsComponent {
  constructor(private router: Router) {}

  goToLoginSecurity() {
    this.router.navigate(['main/accounts-settings/security-settings']);
    console.log("login")
  }

  goToPaymentsWalletSetting() {
    this.router.navigate(['main/accounts-settings/payment-wallet-settings']);
    console.log("payment")
  }
}
