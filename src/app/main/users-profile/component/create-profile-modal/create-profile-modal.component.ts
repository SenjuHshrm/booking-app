import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-profile-modal',
  templateUrl: './create-profile-modal.component.html',
  styleUrls: ['./create-profile-modal.component.scss']
})
export class CreateProfileModalComponent {
  constructor(public dialogCreateProfileModal: MatDialogRef<CreateProfileModalComponent>) { }


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
