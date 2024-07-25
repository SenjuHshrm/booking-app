import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-booking-terms',
  templateUrl: './booking-terms.component.html',
  styleUrls: ['./booking-terms.component.scss']
})
export class BookingTermsComponent {
  constructor(public dialogRef: MatDialogRef<BookingTermsComponent>) { }

  closeDialogInfo(): void {
    this.dialogRef.close();
  }
}
