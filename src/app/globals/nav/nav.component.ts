import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],

})

export class NavComponent {
  constructor(
    public dialog: MatDialog,
    private router: Router
    ) {}


openLoginDialog(): void {
  const dialogRefLogin = this.dialog.open(LoginComponent, {
    panelClass: 'custom-login-modal'
  });

  dialogRefLogin.afterClosed().subscribe(() => {
    console.log('The dialog was closed');
  });
}



openSignupDialog(): void {
  const dialogRefSignup = this.dialog.open(SignupComponent, {
    panelClass: 'custom-signup-modal'
  });

  dialogRefSignup.afterClosed().subscribe(() => {
    console.log('The dialog was closed');
  });
}



goToHome() {
  this.router.navigate(['']);
}


goToCustomerDashboard() {
  this.router.navigate(['main/dashboard']);
}

goToUserProfile() {
  this.router.navigate(['main/users-profile']);
}


goToAccountSettings() {
  this.router.navigate(['main/accounts-settings']);
}


goToMessage() {
  this.router.navigate(['main/message']);
}

goToNotification() {
  this.router.navigate(['main/notification']);
}

goToWishlist() {
  this.router.navigate(['main/wishlist']);
}



}
