import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-longterm-learnmore',
  templateUrl: './longterm-learnmore.component.html',
  styleUrls: ['./longterm-learnmore.component.scss']
})
export class LongtermLearnmoreComponent {
  constructor(public dialogRef: MatDialogRef<LongtermLearnmoreComponent>) { }

  closeDialogInfo(): void {
    this.dialogRef.close();
  }
}
