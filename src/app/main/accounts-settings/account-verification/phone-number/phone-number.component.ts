import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { VerificationCodeComponent } from '../verification-code/verification-code.component';

@Component({
  selector: 'app-phone-number',
  templateUrl: './phone-number.component.html',
  styleUrls: ['./phone-number.component.scss']
})
export class PhoneNumberComponent {

  public phoneNumber: any;

  constructor(
    public dialogVeri: MatDialog,
    public dialog: MatDialogRef<PhoneNumberComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.phoneNumber = data;
  }

  closeDialog(): void {
    this.dialog.close();
  }

  dialogverifyNumber(): void {
    this.dialogVeri.open(VerificationCodeComponent, {
      width: '100%',
      height: 'fit-content',
      maxHeight: 'auto',
      maxWidth: '45rem',
      data: this.phoneNumber._number
    });

    this.closeDialog();
  }

  
}
