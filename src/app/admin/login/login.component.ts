import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private router: Router) {}
  
  username:any;
  password: string = '';
  showPassword: boolean = false;

  navigateToDashboard() {
    this.router.navigate(['admin/home']);
    console.log("Click");
  }
 
   
  login(username: string, password: string): void {
    // Implement login logic here
    console.log("Username:", username);
    console.log("Password:", password);
    this.navigateToDashboard()
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }


  
}
