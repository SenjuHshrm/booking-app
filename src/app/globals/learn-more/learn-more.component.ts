import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-learn-more',
  templateUrl: './learn-more.component.html',
  styleUrls: ['./learn-more.component.scss']
})
export class LearnMoreComponent {
  constructor(public dialogRef: MatDialogRef<LearnMoreComponent>) { }

  closeDialogInfo(): void {
    this.dialogRef.close();
  }
}
