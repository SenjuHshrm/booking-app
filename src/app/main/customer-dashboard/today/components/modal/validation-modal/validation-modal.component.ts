import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-validation-modal',
  templateUrl: './validation-modal.component.html',
  styleUrls: ['./validation-modal.component.scss']
})
export class ValidationModalComponent {
  constructor(public dialogRef: MatDialogRef<ValidationModalComponent>) { }

  closeValidation(): void {
    this.dialogRef.close();
  }
}
