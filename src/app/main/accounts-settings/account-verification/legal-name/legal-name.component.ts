import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-legal-name',
  templateUrl: './legal-name.component.html',
  styleUrls: ['./legal-name.component.scss']
})
export class LegalNameComponent {

  public verifiedInfo: any;

  constructor(
    public dialog: MatDialogRef<LegalNameComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.verifiedInfo = data;
    console.log(this.verifiedInfo)
  }

  closeDialog(): void {
    this.dialog.close();
  }
}
