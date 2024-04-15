import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  constructor(
    public dialogSignup: MatDialogRef<SignupComponent>
    ) {

  }
 
 closeDialogSign(): void {
   this.dialogSignup.close();
 }
 
 firstname:string = '';
 lastname: string = '';
 showPassword: boolean = false;
 
 signup(firstname: string, lastname: string): void {
   // Implement login logic here
   console.log("Firstname:", firstname);
   console.log("Lastname:", lastname);
   this.dialogSignup.close();
 }
 
 
 togglePasswordVisibility(): void {
   this.showPassword = !this.showPassword;
 }
 
}
