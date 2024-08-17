import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-legal-name',
  templateUrl: './legal-name.component.html',
  styleUrls: ['./legal-name.component.scss']
})
export class LegalNameComponent {

  public verifiedInfo: { firstname: string; lastname: string };

  constructor(
    public dialog: MatDialogRef<LegalNameComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { firstname: string; lastname: string }
  ) {
    this.verifiedInfo = data;
    console.log(this.verifiedInfo);
  }

  closeDialog(): void {
    if (this.verifiedInfo.firstname && this.verifiedInfo.lastname) {
      this.dialog.close();
    }
  }

  onSubmit(): void {
    this.dialog.close({
      firstname: this.verifiedInfo.firstname,
      lastname: this.verifiedInfo.lastname
    });
  }
}
