import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CameraComponent } from '../camera/camera.component';

@Component({
  selector: 'app-capture-photo',
  templateUrl: './capture-photo.component.html',
  styleUrls: ['./capture-photo.component.scss'],
})
export class CapturePhotoComponent {
  frontFile: File | null = null;
  backFile: File | null = null;

  frontPreview: File | null = null;
  backPreview: File | null = null;

  type: string = 'Passport';
  imgPlaceholder: string = `assets/images/customer-dashboard/create-listing/cameraadd.png`;

  constructor(private dialog: MatDialog) {}

  validIDType: any = [
    { _ids: 'Passport' },
    { _ids: "Driver's License" },
    { _ids: 'Identity Card' },
  ];

  handleCaptureCamera(type: string): void {
    const camera = this.dialog.open(CameraComponent, {
      disableClose: true,
      data: type,
    });

    camera.afterClosed().subscribe((res) => {
      if (res.success) {
        const { file, preview, type } = res;
        if (type === 'front') {
          this.frontFile = file;
          this.frontPreview = preview;
        }

        if (type === 'back') {
          this.backFile = file;
          this.backPreview = preview;
        }
      }
    });
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
