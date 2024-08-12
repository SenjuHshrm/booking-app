import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-cancel-policy-learnmore',
  templateUrl: './cancel-policy-learnmore.component.html',
  styleUrls: ['./cancel-policy-learnmore.component.scss']
})
export class CancelPolicyLearnmoreComponent {
  constructor(public dialogRef: MatDialogRef<CancelPolicyLearnmoreComponent>) {}

  closeDialogInfo(): void {
    this.dialogRef.close();
  }
}
