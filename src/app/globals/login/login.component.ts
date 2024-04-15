import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(public dialogLogin: MatDialogRef<LoginComponent>) { }
  

  dialog: any;
  username:any;
  password: string = '';
  showPassword: boolean = false;
  
  login(username: string, password: string): void {
    // Implement login logic here
    console.log("Username:", username);
    console.log("Password:", password);
    this.dialogLogin.close();
  }
  

  closeDialogLogin(): void {
    this.dialogLogin.close();
  }
  

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
