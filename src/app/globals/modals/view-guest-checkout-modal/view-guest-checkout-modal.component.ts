import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface Guest {
  guestName: string;
  status: string;
  dateCheckout: Date;
  timeCheckout: string;
}

@Component({
  selector: 'app-view-guest-checkout-modal',
  templateUrl: './view-guest-checkout-modal.component.html',
  styleUrls: ['./view-guest-checkout-modal.component.scss']
})
export class ViewGuestCheckoutModalComponent {
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any,
    public dialogRef: MatDialogRef<ViewGuestCheckoutModalComponent>
  ) {}

  ngOnInit(): void {
 
  }
  
  
  closeDialog(): void {
    this.dialogRef.close();
  }

  guests: Guest[] = [
    { guestName: 'John Doea', status: 'Checked Out', timeCheckout: '10:00 AM', dateCheckout: new Date()},
    { guestName: 'John Doe', status: 'Checked Out', timeCheckout: '10:00 AM', dateCheckout: new Date()},
    { guestName: 'John Doe', status: 'Checked Out', timeCheckout: '10:00 AM', dateCheckout: new Date()}
  ];
}




