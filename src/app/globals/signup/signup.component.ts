import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from './../../services/auth.service';
import { Location } from '@angular/common';
import { TokenService } from './../../services/token.service';
import { UserService } from './../../services/user.service';
import { FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public signupForm!: FormGroup

  private _redirect: string = ''

  constructor(
    public dialogSignup: MatDialogRef<SignupComponent>,
    private _fb: FormBuilder,
    private _user: UserService,
    private _token: TokenService,
    private _loc: Location,
    private _auth: AuthService
    ) {

  }

  ngOnInit(): void {
    this._redirect = this._loc.path()
    this.signupForm = this._fb.group({
      fName: new FormControl('', [Validators.required]),
      lName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    })
  }
 
 closeDialogSign(): void {
   this.dialogSignup.close();
 }
 
 firstname:string = '';
 lastname: string = '';
 showPassword: boolean = false;
 
 signup(fg: FormGroup): void {
   // Implement login logic here
   let data = fg.value
   this._auth.csrfToken()
    .pipe(
      switchMap(x => this._user.register(data, x.token)),
      catchError(e => e)
    )
    .subscribe({
      next: (res: any) => {
        this._token.saveToken(res.token)
        window.location.href = this._redirect
        this.dialogSignup.close();
      }
    })
 }
 
 
 togglePasswordVisibility(): void {
   this.showPassword = !this.showPassword;
 }
 
}
