import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface Confirmation {
  title: string;
  description: string;
  yesBtnText: string;
  noBtnText: string;
}

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss'],
})
export class ConfirmationComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Confirmation
  ) {}

  closeValidation(confirm: boolean): void {
    this.dialogRef.close({ confirm });
  }
}
