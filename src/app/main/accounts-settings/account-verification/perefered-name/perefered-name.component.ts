import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-perefered-name',
  templateUrl: './perefered-name.component.html',
  styleUrls: ['./perefered-name.component.scss']
})
export class PereferedNameComponent {

  public verifiedInfo: any;

  constructor(
    public dialog: MatDialogRef<PereferedNameComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.verifiedInfo = data;
  }

  closeDialog(): void {
    this.dialog.close();
  }
}
