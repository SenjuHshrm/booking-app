import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-non-refund-learnmore',
  templateUrl: './non-refund-learnmore.component.html',
  styleUrls: ['./non-refund-learnmore.component.scss']
})
export class NonRefundLearnmoreComponent {
  constructor(public dialogRef: MatDialogRef<NonRefundLearnmoreComponent>) { }

  closeDialogInfo(): void {
    this.dialogRef.close();
  }
}
