import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BasicUtilService } from 'src/app/services/basic-util.service';

@Component({
  selector: 'app-view-verification',
  templateUrl: './view-verification.component.html',
  styleUrls: ['./view-verification.component.scss'],
})
export class ViewVerificationComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<ViewVerificationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _util: BasicUtilService
  ) {}

  handleClose(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {}

  get frontIdSrc(): string {
    return this._util.setImgUrl(this.data.idFront);
  }

  get backIdSrc(): string {
    return this._util.setImgUrl(this.data.idBack);
  }

  get fullName(): string {
    return this._util.constructName(this.data.userInfo[0].name);
  }
}
