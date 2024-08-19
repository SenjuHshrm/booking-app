import { Component } from '@angular/core';

@Component({
  selector: 'app-upload-photo',
  templateUrl: './upload-photo.component.html',
  styleUrls: ['./upload-photo.component.scss']
})
export class UploadPhotoComponent {

  validIDType: any = [
    { _ids: 'Passport' },
    { _ids: "Driver's License" },
    { _ids: "Identity Card" }
  ]

frontFile: File | null = null;
backFile: File | null = null;

onFileChange(event: any, type: string) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      if (type === 'front') {
        this.frontFile = e.target.result;
      } else if (type === 'back') {
        this.backFile = e.target.result;
      }
    };
    reader.readAsDataURL(file);
  }
}

onSubmit() {
  if (this.frontFile && this.backFile) {
    // Handle form submission, e.g., send files to a server
    console.log('Front File:', this.frontFile);
    console.log('Back File:', this.backFile);
  } else {
    alert('Please upload both front and back views of the ID.');
  }
}
}
