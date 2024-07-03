import { TokenService } from './../../services/token.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { IAuthForm, IAuth } from '../../interfaces/auth';
import { Location } from '@angular/common'
import { SocialAuthService, GoogleLoginProvider } from '@abacritt/angularx-social-login'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  dialog: any;
  username:any;
  password: string = '';
  showPassword: boolean = false;

  public loginForm!: FormGroup<IAuthForm>
  public validation: any = {
    email: [
      {
        type: 'required',
        msg: 'Field required'
      },
      {
        type: 'email',
        msg: 'Invalid email format'
      }
    ],
    password: [
      {
        type: 'required',
        msg: 'Field required'
      }
    ]
  }

  private _redirectTo: string = ''
  private _sub: Subscription = new Subscription()

  constructor(
    public dialogLogin: MatDialogRef<LoginComponent>,
    private _location: Location,
    private _fb: FormBuilder,
    private _socAuth: SocialAuthService,
    private _auth: AuthService,
    private _token: TokenService
  ) { }

  ngOnInit(): void {
    this._redirectTo = this._location.path()
    this.loginForm = this._fb.group<IAuthForm>({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    })

    this._socAuth.authState.subscribe({
      next: (res: any) => {
        console.log(res)
      },
      error: (err: any) => {
        console.log(err)
      }
    })
  }

  ngOnDestroy(): void {
    this._sub.unsubscribe()
  }
  
  login(fg: FormGroup<IAuthForm>): void {
    // Implement login logic here
    // console.log("Username:", username);
    // console.log("Password:", password);
    // this.dialogLogin.close();
    console.log(fg.value)
    let data: IAuth = <IAuth>fg.value
    this._sub.add(this._auth.login(data).subscribe({
      next: (res: { token: string }) => {
        this._token.saveToken(res.token)
        window.location.href = this._redirectTo
      },
      error: ({ error }: HttpErrorResponse) => {

      }
    }))
  }
  
  loginWithGoogle() {
    console.log('Login with Google')
    this._socAuth.signIn(GoogleLoginProvider.PROVIDER_ID)
  }

  closeDialogLogin(): void {
    this.dialogLogin.close();
  }
  

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
