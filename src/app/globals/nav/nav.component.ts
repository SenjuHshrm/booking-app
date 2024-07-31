import { SocialAuthService } from '@abacritt/angularx-social-login';
import { BasicUtilService } from './../../services/basic-util.service';
import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from './../../services/user.service';
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
  public profileImg: any
  
  private _claims!: ITokenClaims | string
  private _redirectTo: string = ''

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private _location: Location,
    private _socAuth: SocialAuthService,
    private _auth: AuthService,
    private _token: TokenService,
    private _user: UserService,
    private _basicUtl: BasicUtilService
  ) {}

  ngOnInit(): void {
    this._checkToken()
  }


  public openLoginDialog(): void {
    const dialogRefLogin = this.dialog.open(LoginComponent, {
      panelClass: 'custom-login-modal'
    });

    dialogRefLogin.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }

  public openSignupDialog(): void {
    const dialogRefSignup = this.dialog.open(SignupComponent, {
      panelClass: 'custom-signup-modal'
    });

    dialogRefSignup.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }



  public goToHome() {
    this.router.navigate(['']);
  }


  public goToCustomerDashboard() {
    this.router.navigate(['main/dashboard']);
  }

  public goToUserProfile() {
    this.router.navigate(['main/users-profile']);
  }


  public goToAccountSettings() {
    this.router.navigate(['main/accounts-settings']);
  }


  public goToMessage() {
    this.router.navigate(['main/message']);
  }

  public goToNotification() {
    this.router.navigate(['main/notification']);
  }

  public goToYourTrips() {
    this.router.navigate(['main/trips']);
  }

  public goToWishlist() {
    this.router.navigate(['main/wishlist']);
  }

  public goToProprietorReg() {
    this.router.navigate(['register-proprietorship']);
  }

  public logout() {
    this._auth.logout().subscribe({
      next: (res: { logout: boolean }) => {
        if(localStorage.getItem('GOOGLE_ID_TOKEN') !== null) {
          localStorage.removeItem('GOOGLE_ID_TOKEN')
        }
        this._token.removeToken()
        window.location.href = this._redirectTo
      }
    })
  }

  private _checkToken() {
    this._claims = <ITokenClaims | string>this._token.decodedToken()
    if(this._claims !== '') {
      this.isHost = (<ITokenClaims>this._claims).access.indexOf('host') !== -1
      // this.profileImg = this._user.getUserProfileImg((<ITokenClaims>this._claims).sub)
      // this._getProfileImg((<ITokenClaims>this._claims).sub)
      this.profileImg = this._basicUtl.setImgUrl((<ITokenClaims>this._claims).img)
    } else {
      this.isHost = false
    }
    this._redirectTo = this._location.path()
  }

}
