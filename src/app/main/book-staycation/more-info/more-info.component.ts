import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-more-info',
  templateUrl: './more-info.component.html',
  styleUrls: ['./more-info.component.scss']
})
export class MoreInfoComponent {
  constructor(public dialogRef: MatDialogRef<MoreInfoComponent>) { }

  closeDialogInfo(): void {
    this.dialogRef.close();
  }
}
