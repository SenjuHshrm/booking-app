import { switchMap, catchError } from 'rxjs/operators';
import { TokenService } from './../../services/token.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, Subscription, of } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit, OnDestroy, Injector, ChangeDetectorRef, inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { IAuthForm, IAuth } from '../../interfaces/auth';
import { AsyncPipe, Location } from '@angular/common';
import {
  SocialAuthService,
  GoogleLoginProvider,
} from '@abacritt/angularx-social-login';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { SignupComponent } from '../signup/signup.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  username: any;
  password: string = '';
  showPassword: boolean = false;

  public csrfToken$!: Observable<any>
  public loginForm!: FormGroup<IAuthForm>;
  public validation: any = {
    email: [
      {
        type: 'required',
        msg: 'Field required',
      },
      {
        type: 'email',
        msg: 'Invalid email format',
      },
    ],
    password: [
      {
        type: 'required',
        msg: 'Field required',
      },
    ],
  };

  public isLoading = false;

  private _redirectTo: string = '';
  private _sub: Subscription = new Subscription();
  private _snack: MatSnackBar = inject(MatSnackBar);

  private _successLogin = (res: { token: string }) => {
    this._token.saveToken(res.token);
    window.location.href = this._redirectTo;
  };

  private _failedLogin = ({ error }: HttpErrorResponse) => {
    this.isLoading = false;
    this._snack.open(error.code, '', { duration: 1000 });
  };

  constructor(
    public dialogLogin: MatDialogRef<LoginComponent>,
    public dialog: MatDialog,
    private _location: Location,
    private _fb: FormBuilder,
    private _auth: AuthService,
    private _token: TokenService
  ) {}

  ngOnInit(): void {
    // this.csrfToken$.subscribe({})
    this._redirectTo = this._location.path();
    this.loginForm = this._fb.group<IAuthForm>({
      email: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.email]),
      password: new FormControl({ value: '', disabled: false }, [Validators.required]),
    });
    // this._socAuth.authState.subscribe({
    //   next: (res: any) => {
    //     let data  = {
    //       userData: {
    //         firstName: res.firstName,
    //         lastName: res.lastName,
    //         photoUrl: res.photoUrl
    //       },
    //       authData: {
    //         email: res.email,
    //         id: res.id
    //       }
    //     }
    //     this._saveProviderData(data, res.idToken)
    //   },
    //   error: (err: any) => {
    //     console.log(err)
    //   }
    // })
  }

  ngOnDestroy(): void {
    this._sub.unsubscribe();
  }

  login(fg: FormGroup<IAuthForm>): void {
    // Implement login logic here
    this.loginForm.disable()
    this.isLoading = true;
    let data: IAuth = <IAuth>fg.value;
    this._auth.csrfToken()
      .pipe(
        switchMap((x) => {
          return this._auth.login(data, x.token)
        }),
        catchError((e) => {
          return e
        })
      )
      .subscribe({
        next: (res: any) => {
          this._token.saveToken(res.token);
          window.location.href = this._redirectTo;
        },
        error: ({ error }: HttpErrorResponse) => {
          this.isLoading = false;
          this._snack.open(error.code, '', { duration: 1000 });
        }
      })
    // this.csrfToken$.subscribe((xsrf: {token: string}) => {
      
    // })
    
    
    
    // this._sub.add(
    //   this._auth.login(data).subscribe({
    //     next: this._successLogin,
    //     error: this._failedLogin,
    //   })
    // );
  }

  closeDialogLogin(): void {
    if (this.isLoading) return;
    this.dialogLogin.close();
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  private _saveProviderData(
    data: { authData: any; userData: any },
    token: string
  ) {
    this._sub.add(
      this._auth.googleLogin(data).subscribe({
        next: this._successLogin,
        error: this._failedLogin,
        complete: () => {
          localStorage.setItem('GOOGLE_ID_TOKEN', token);
        },
      })
    );
  }

  handleForgotPass(): void {
    const dialogRefSec = this.dialog.open(ForgotPasswordComponent, {
      width: '100%',
      height: '100%',
      maxHeight: '30rem',
      maxWidth: '25rem',
      data: '',
    });

    dialogRefSec.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
    console.log('Sample');
  }

  public openSignupDialog(): void {
    const dialogRefSignup = this.dialog.open(SignupComponent, {
      panelClass: 'custom-signup-modal',
    });

    dialogRefSignup.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });

    this.closeDialogLogin();
  }
}
