import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from './../../../services/auth.service';
import { Component, inject, Inject, OnDestroy, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { BookingService } from 'src/app/services/booking.service';
import { ConfirmationComponent } from '../../confirmation/confirmation.component';

export interface Guest {
  _id: string;
  name: string;
  checkInDate: string;
  checkInTime: string;
  checkOutDate?: string;
  checkOutTime?: string;
}

@Component({
  selector: 'app-view-guest-checkout-modal',
  templateUrl: './view-guest-checkout-modal.component.html',
  styleUrls: ['./view-guest-checkout-modal.component.scss'],
})
export class ViewGuestCheckoutModalComponent implements OnInit, OnDestroy {
  private _subs: Subscription = new Subscription();
  private _snack: MatSnackBar = inject(MatSnackBar);
  public isLoading: boolean = false;
  public outLoading: boolean = false;
  public guests: Guest[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ViewGuestCheckoutModalComponent>,
    private _booking: BookingService,
    private _dialog: MatDialog,
    private _auth: AuthService
  ) {}

  ngOnInit(): void {
    this.handleGetGuests();
  }

  ngOnDestroy(): void {
    if (!this._subs) return;
    this._subs.unsubscribe();
  }

  closeDialog(): void {
    if (this.outLoading) return;
    this.dialogRef.close();
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

  checkOutGuest(id: string, name: string): void {
    const checkout = this._dialog.open(ConfirmationComponent, {
      width: '100%',
      maxWidth: '25rem',
      data: {
        title: 'Check-Out Guest',
        description: `Are you sure you want to check-out ${name}?`,
        yesBtnText: 'Proceed',
        noBtnText: 'Cancel',
      },
    });

    checkout.afterClosed().subscribe(({ confirm }) => {
      if (confirm) {
        this.outLoading = true;
        const currentTime = moment().format('HH:mm').toString();
        const currentDate = moment().format('MM/DD/YYYY').toString();
        const checkOutData = {
          checkOutDate: currentDate,
          checkOutTime: currentTime,
        };
        this._subs.add(
          this._auth.csrfToken()
            .pipe(
              switchMap(x => this._booking.checkOutGuest(id, checkOutData, x.token)),
              catchError(e => e)
            )
            .subscribe({
              next: (res) => {
                this.outLoading = false;
                this.handleGetGuests();
              },
              error: ({ error }) => {
                this._snack.open(error.code, '', { duration: 1000 });
                this.outLoading = false;
              },
            })
        );
      }
    });
  }

  formatTime(time: string): string {
    return moment(time, 'HH:mm').format('hh:mm A');
  }
}
