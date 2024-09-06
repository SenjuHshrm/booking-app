import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { AddGuestComponent } from './add-guest/add-guest.component';

export interface Guest {
  guestName: string;
  status: string;
  dateCheckout: Date;
  timeCheckout: string;
}

@Component({
  selector: 'app-view-guest-list-modal',
  templateUrl: './view-guest-list-modal.component.html',
  styleUrls: ['./view-guest-list-modal.component.scss'],
})
export class ViewGuestListModalComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ViewGuestListModalComponent>,
    private _dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  closeDialog(): void {
    this.dialogRef.close();
  }

  addGuestModal(): void {
    const add = this._dialog.open(AddGuestComponent, {
      disableClose: true,
      width: '100%',
      maxWidth: '35rem',
      data: { bookingId: this.data },
    });
  }

  guests: Guest[] = [
    {
      guestName: 'John Doea',
      status: 'Checked Out',
      timeCheckout: '10:00 AM',
      dateCheckout: new Date(),
    },
    {
      guestName: 'John Doe',
      status: 'Checked Out',
      timeCheckout: '10:00 AM',
      dateCheckout: new Date(),
    },
    {
      guestName: 'John Doe',
      status: 'Checked Out',
      timeCheckout: '10:00 AM',
      dateCheckout: new Date(),
    },
  ];
}
