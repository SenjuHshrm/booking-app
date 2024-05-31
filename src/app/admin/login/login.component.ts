import { TokenService } from './../../services/token.service';
import { FormControl, Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IAuth, IAuthForm } from '../../interfaces/auth';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username:any;
  password: string = '';
  showPassword: boolean = false;
  public loginForm!: FormGroup<IAuthForm>

  constructor(
    private router: Router,
    private _fb: FormBuilder,
    private _auth: AuthService,
    private _token: TokenService
  ) {}
  
  ngOnInit(): void {
    this.loginForm = this._fb.group<IAuthForm>({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    })
  }

  navigateToDashboard() {
    this.router.navigate(['admin/home']);
    console.log("Click");
  }
 
   
  login(fg: FormGroup<IAuthForm>): void {
    this._auth.login(<IAuth>fg.value).subscribe({
      next: (res: { token: string }) => {
        this._token.saveToken(res.token),
        window.location.href = '/admin/home'
      }
    })
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }


  
}
