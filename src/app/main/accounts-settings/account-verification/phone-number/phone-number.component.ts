import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-phone-number',
  templateUrl: './phone-number.component.html',
  styleUrls: ['./phone-number.component.scss']
})
export class PhoneNumberComponent {

  public phoneNumber: any;

  constructor(
    public dialog: MatDialogRef<PhoneNumberComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.phoneNumber = data;
  }

  closeDialog(): void {
    this.dialog.close();
  }
}
