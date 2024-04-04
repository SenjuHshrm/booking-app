import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],

})

export class NavComponent {
  constructor(public dialog: MatDialog) {}

//Login
openLoginDialog(): void {
  const dialogRefLogin = this.dialog.open(LoginComponent, {
    panelClass: 'custom-login-modal'
  });

  dialogRefLogin.afterClosed().subscribe(() => {
    console.log('The dialog was closed');
  });
}
//Login

//Sign-Up
openSignupDialog(): void {
  const dialogRefSignup = this.dialog.open(SignupComponent, {
    panelClass: 'custom-signup-modal'
  });

  dialogRefSignup.afterClosed().subscribe(() => {
    console.log('The dialog was closed');
  });
}
//Sign-Up
}
