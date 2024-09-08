import { Component, inject, Inject, OnDestroy, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { AddGuestComponent } from './add-guest/add-guest.component';
import { Subscription } from 'rxjs';
import { BookingService } from 'src/app/services/booking.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface Guest {
  name: string;
  checkInDate: string;
  checkInTime: string;
}

@Component({
  selector: 'app-view-guest-list-modal',
  templateUrl: './view-guest-list-modal.component.html',
  styleUrls: ['./view-guest-list-modal.component.scss'],
})
export class ViewGuestListModalComponent implements OnInit, OnDestroy {
  private _subs: Subscription = new Subscription();
  private _snack: MatSnackBar = inject(MatSnackBar);
  public guests: Guest[] = [];
  public isLoading: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ViewGuestListModalComponent>,
    private _dialog: MatDialog,
    private _booking: BookingService
  ) {}

  ngOnInit(): void {
    this.handleGetGuests();
  }

  ngOnDestroy(): void {
    if (!this._subs) return;
    this._subs.unsubscribe();
  }

  handleGetGuests(): void {
    this.isLoading = true;
    this._subs.add(
      this._booking.getBookingGuests(this.data).subscribe({
        next: (res) => {
          this.guests = res;
          this.isLoading = false;
        },
        error: ({ error }) => {
          this._snack.open(error.code, '', { duration: 1000 });
          this.isLoading = false;
        },
      })
    );
  }

  closeDialog(): void {
    if (this.isLoading) return;
    this.dialogRef.close();
  }

  addGuestModal(): void {
    const add = this._dialog.open(AddGuestComponent, {
      disableClose: true,
      width: '100%',
      maxWidth: '35rem',
      data: { bookingId: this.data },
    });

    add.afterClosed().subscribe((res) => {
      if (res) this.handleGetGuests();
    });
  }
}
