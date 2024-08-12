import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-whereto-sleep-view',
  templateUrl: './whereto-sleep-view.component.html',
  styleUrls: ['./whereto-sleep-view.component.scss']
})
export class WheretoSleepViewComponent {
  constructor(
    public dialogRef: MatDialogRef<WheretoSleepViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

    viewImageBed:any = this.data;
  

  closeBedView(): void {
    this.dialogRef.close();
    console.log("Error")
  }


}
