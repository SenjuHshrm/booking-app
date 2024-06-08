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

  constructor(
    public dialogSignup: MatDialogRef<SignupComponent>,
    private _fb: FormBuilder,
    private _user: UserService
    ) {

  }

  ngOnInit(): void {
    this.signupForm = this._fb.group({
      fName: new FormControl('', [Validators.required]),
      lName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email])
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
   this._user.register(data).subscribe({
    next: () => {
      this.dialogSignup.close();
    }
   })
 }
 
 
 togglePasswordVisibility(): void {
   this.showPassword = !this.showPassword;
 }
 
}
