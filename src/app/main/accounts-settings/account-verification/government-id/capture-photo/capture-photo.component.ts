import { Component } from '@angular/core';

@Component({
  selector: 'app-capture-photo',
  templateUrl: './capture-photo.component.html',
  styleUrls: ['./capture-photo.component.scss']
})

export class CapturePhotoComponent {

  captureFileFront:any = {}
  captureFileBack:any = {}

  validIDType: any = [
    { _ids: 'Passport' },
    { _ids: "Driver's License" },
    { _ids: "Identity Card" }
  ]

  onSubmit() {

  }
}
