import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface Guest {
  guestName: string;
  status: string;
  dateCheckout: Date;
  timeCheckout: string;
}


@Component({
  selector: 'app-view-guest-list-modal',
  templateUrl: './view-guest-list-modal.component.html',
  styleUrls: ['./view-guest-list-modal.component.scss']
})
export class ViewGuestListModalComponent {
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any,
    public dialogRef: MatDialogRef<ViewGuestListModalComponent>
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




