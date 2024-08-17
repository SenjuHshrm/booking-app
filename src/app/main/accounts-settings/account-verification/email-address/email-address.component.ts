import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-email-address',
  templateUrl: './email-address.component.html',
  styleUrls: ['./email-address.component.scss']
})
export class EmailAddressComponent {
  public verifiedInfo: any;

  constructor(
    public dialog: MatDialogRef<EmailAddressComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.verifiedInfo = data;
  }

  closeDialog(): void {
    this.dialog.close();
  }
}
