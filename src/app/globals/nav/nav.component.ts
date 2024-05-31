import { ITokenClaims } from './../../interfaces/token';
import { TokenService } from './../../services/token.service';
import { AuthService } from './../../services/auth.service';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';
import { Router } from '@angular/router';
import { Location } from '@angular/common'

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],

})

export class NavComponent implements OnInit {

  @Input() public isAuth: boolean = false

  public isHost!: boolean
  
  private _claims!: ITokenClaims
  private _redirectTo: string = ''

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private _location: Location,
    private _auth: AuthService,
    private _token: TokenService
    ) {}

  ngOnInit(): void {
    this._claims = this._token.decodedToken()
    this.isHost = this._claims.access.indexOf('host') !== -1
    console.log(this.isHost)
    this._redirectTo = this._location.path()
  }


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

  goToProprietorReg() {
    this.router.navigate(['register-proprietorship']);
  }

  logout() {
    this._auth.logout().subscribe({
      next: (res: { logout: boolean }) => {
        this._token.removeToken()
        window.location.href = this._redirectTo
      }
    })
  }




}
