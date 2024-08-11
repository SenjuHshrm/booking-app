import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-message-proprietor',
  templateUrl: './message-proprietor.component.html',
  styleUrls: ['./message-proprietor.component.scss']
})
export class MessageProprietorComponent {
  constructor(
    public dialogRef: MatDialogRef<MessageProprietorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  closeDialogMessage(): void {
    this.dialogRef.close();
  }
}
