import { Component } from '@angular/core';

@Component({
  selector: 'app-upload-photo',
  templateUrl: './upload-photo.component.html',
  styleUrls: ['./upload-photo.component.scss'],
})
export class UploadPhotoComponent {
  validIDType: any = [
    { _ids: 'Passport' },
    { _ids: "Driver's License" },
    { _ids: 'Identity Card' },
  ];

  frontFile: File | null = null;
  backFile: File | null = null;

  frontPreview: File | null = null;
  backPreview: File | null = null;

  type: string = 'Passport';

  onFileChange(event: any, type: string) {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (type === 'front') {
          this.frontFile = file;
          this.frontPreview = e.target.result;
        } else if (type === 'back') {
          this.backFile = file;
          this.backPreview = e.target.result;
        }
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.frontFile && this.backFile && this.type !== '') {
      const idFormData = new FormData();
      idFormData.append('idType', this.type);
      idFormData.append('idFront ', this.frontFile);
      idFormData.append('idBack ', this.backFile);
      // Save Data Here
    } else {
      alert('Please upload both front and back views of the ID.');
    }
  }
}
