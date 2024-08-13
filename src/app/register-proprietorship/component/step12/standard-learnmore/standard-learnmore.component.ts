import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-standard-learnmore',
  templateUrl: './standard-learnmore.component.html',
  styleUrls: ['./standard-learnmore.component.scss']
})
export class StandardLearnmoreComponent {
  constructor(public dialogRef: MatDialogRef<StandardLearnmoreComponent>) { }

  closeDialogInfo(): void {
    this.dialogRef.close();
  }
}
