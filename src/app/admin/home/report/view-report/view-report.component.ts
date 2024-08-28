import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Fullname } from 'src/app/interfaces/profile';
import { BasicUtilService } from 'src/app/services/basic-util.service';

@Component({
  selector: 'app-view-report',
  templateUrl: './view-report.component.html',
  styleUrls: ['./view-report.component.scss'],
})
export class ViewReportComponent {
  constructor(
    private dialogRef: MatDialogRef<ViewReportComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _util: BasicUtilService
  ) {}

  handleClose(): void {
    this.dialogRef.close();
  }

  fullName(name: Fullname): string {
    return this._util.constructName(name);
  }
}
