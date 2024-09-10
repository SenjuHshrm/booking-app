
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-validation-trips-modal',
  templateUrl: './validation-trips-modal.component.html',
  styleUrls: ['./validation-trips-modal.component.scss']
})
export class ValidationTripsModalComponent {
  constructor(
    public dialogRef: MatDialogRef<ValidationTripsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: any, title: string }
  ) { }

  closeValidation(): void {
    this.dialogRef.close();
  }

  onConfirm(): void {
    this.dialogRef.close('confirm');
  }
}
