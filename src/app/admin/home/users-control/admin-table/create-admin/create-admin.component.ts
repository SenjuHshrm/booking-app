import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-admin',
  templateUrl: './create-admin.component.html',
  styleUrls: ['./create-admin.component.scss']
})
export class CreateAdminComponent {
  constructor(public dialogCreateProfileModal: MatDialogRef<CreateAdminComponent>) { }

  dialog: any;
  username:any;
  password: string = '';
  confirmpassword: string = '';
  showPassword: boolean = false;
  showConPassword: boolean = false;
  
  login(username: string, password: string, confirmpassword:string): void {
    // Implement login logic here
    console.log("Username:", username);
    console.log("Password:", password);
    console.log("Password:", confirmpassword);
    this.dialogCreateProfileModal.close();
  }
  
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
  toggleConfirmPasswordVisibility(): void {
    this.showConPassword = !this.showConPassword;
  }
  

  closeDialogCreateProfile(): void {
    this.dialogCreateProfileModal.close();
  }


  imageUrl: string | ArrayBuffer | null = null;
  fileToUpload: File | null = null;

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.fileToUpload = file;

    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imageUrl = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  uploadImage() {
    if (this.fileToUpload) {
      console.log('Image uploaded:', this.fileToUpload);
    } else {
      console.error('No image selected.');
    }
  }
}
