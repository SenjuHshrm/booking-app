import { SocketService } from './../../services/socket.service';
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
import { NavigationEnd, Router } from '@angular/router';
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
  public isDisconnected: boolean = false;
  
  private _claims!: ITokenClaims | string
  private _redirectTo: string = ''

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private _location: Location,
    // private _socAuth: SocialAuthService,
    private _auth: AuthService,
    private _token: TokenService,
    private _user: UserService,
    private _basicUtl: BasicUtilService,
    private _socket: SocketService
  ) {}

  ngOnInit(): void {
    this._checkToken()
  }


  public openLoginDialog(): void {
    this.dialog.open(LoginComponent, {
      panelClass: 'custom-login-modal'
    });

  }

  public openSignupDialog(): void {
    this.dialog.open(SignupComponent, {
      panelClass: 'custom-signup-modal'
    });

  }

  public logout() {
    this._socket.disconnectMain()
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
      this.profileImg = this._basicUtl.setImgUrl((<ITokenClaims>this._claims).img)
      this._initSocket()
    } else {
      this.isHost = false
    }
    this._redirectTo = this._location.path()
  }

  private _initSocket() {
    this._socket.initializeManager()
    this._socket.initMain()
    this._socket.emit('MainSocket', 'main:join', this._claims.sub)

    this._socket.listen('MainSocket', 'disconnect').subscribe(() => {
      this.isDisconnected = true
    })

    this._socket.defaultEventMain('reconnect_attempt').subscribe((attempt: number) => {
      this.isDisconnected = true
    })

    this._socket.defaultEventMain('reconnect').subscribe(() => {
      this.isDisconnected = false
      this._socket.emit('MainSocket', 'main:join', this._claims.sub)
    })
    
  }

}
