import { Location } from '@angular/common';
import { Component, OnInit,HostListener } from '@angular/core';

import { Router } from '@angular/router';
import { fadeInAnimation } from 'src/app/globals/fadein-animations';


@Component({
  selector: 'app-accounts-settings',
  templateUrl: './accounts-settings.component.html',
  styleUrls: ['./accounts-settings.component.scss'],
  animations: [fadeInAnimation]
})
export class AccountsSettingsComponent implements OnInit {

  public togglePanel: any = false;
  isScreenWidthLessThan700px: any;
  
  constructor(
    private router: Router
  ) {
    this.checkScreenWidth();

  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.checkScreenWidth();
  }


  ngOnInit(): void {
    
  }

  private checkScreenWidth(): void {
    const width = window.innerWidth;
    this.isScreenWidthLessThan700px = width < 700;
    console.log(this.isScreenWidthLessThan700px);
    this.togglePanel = this.isScreenWidthLessThan700px ;
  }

  goToLoginSecurity(): void {
    this.router.navigate(['main/accounts-settings/security-settings']);
    this.toggleSidePanel();
  }

  goToPaymentsWalletSetting(): void {
    this.router.navigate(['main/accounts-settings/payment-wallet-settings']);
    this.toggleSidePanel();
  }

  goToPayoutSettings(): void {
    this.router.navigate(['main/accounts-settings/payout-settings']);
    this.toggleSidePanel();
  }

  goToAccountVerification(): void {
    this.router.navigate(['main/accounts-settings/account-verification']);
    this.toggleSidePanel();
  }

 public toggleSidePanel(): void {
    this.togglePanel = !this.togglePanel;
  }




}
