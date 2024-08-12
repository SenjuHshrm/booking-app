import { Location } from '@angular/common';
import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { fadeInAnimation } from 'src/app/globals/fadein-animations';


@Component({
  selector: 'app-accounts-settings',
  templateUrl: './accounts-settings.component.html',
  styleUrls: ['./accounts-settings.component.scss'],
  animations:[fadeInAnimation]
})
export class AccountsSettingsComponent {
  constructor(
    private router: Router
  
  ) {
    
  }
  

  goToLoginSecurity():void {
    this.router.navigate(['main/accounts-settings/security-settings']);
    
  }

  goToPaymentsWalletSetting():void  {
    this.router.navigate(['main/accounts-settings/payment-wallet-settings']);
  }


  

}
