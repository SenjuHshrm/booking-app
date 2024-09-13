import { Component, inject, Inject, OnDestroy, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { ITokenClaims } from 'src/app/interfaces/token';
import { BasicUtilService } from 'src/app/services/basic-util.service';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';
import { ConfirmationComponent } from '../../confirmation/confirmation.component';
import { BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-view-reservation-modal',
  templateUrl: './view-reservation-modal.component.html',
  styleUrls: ['./view-reservation-modal.component.scss'],
})
export class ViewReservationModalComponent implements OnInit, OnDestroy {
  public verifiedIdCard: boolean = false;
  public verifiedMobileNumber: boolean = false;
  public isLoading: boolean = false;
  public statusLoading: boolean = false;

  private _sub: Subscription = new Subscription();
  private _snack: MatSnackBar = inject(MatSnackBar);
  private token!: ITokenClaims;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ViewReservationModalComponent>,
    public _dialog: MatDialog,
    private _util: BasicUtilService,
    private _user: UserService,
    private _token: TokenService,
    private _booking: BookingService
  ) {
    this.token = <ITokenClaims>this._token.decodedToken();
  }

  ngOnInit(): void {
    this.isLoading = true;
    this._sub.add(
      this._user.checkVerificationStatus(this.token.sub).subscribe({
        next: (res) => {
          this.verifiedIdCard = res.status === 'approved';
          this.isLoading = false;
        },
        error: ({ error }) => {
          this._snack.open(error.code, '', { duration: 1000 });
          this.isLoading = false;
        },
      })
    );
  }

  ngOnDestroy(): void {
    if (!this._sub) return;
    this._sub.unsubscribe();
  }

  closeDialog(success: boolean = false): void {
    if (this.statusLoading) return;
    this.dialogRef.close(success);
  }

  confirmApproveModal(): void {
    const approve = this._dialog.open(ConfirmationComponent, {
      width: '100%',
      maxWidth: '25rem',
      data: {
        title: 'Approve Booking',
        description: 'Are you sure you want to approve this booking?',
        yesBtnText: 'Proceed',
        noBtnText: 'Cancel',
      },
    });

    approve.afterClosed().subscribe(({ confirm }) => {
      if (confirm) {
        this.handleUpdateStatus('upcoming');
      }
    });
  }

  confirmDeclineModal(): void {
    const decline = this._dialog.open(ConfirmationComponent, {
      width: '100%',
      maxWidth: '25rem',
      data: {
        title: 'Decline Booking',
        description: 'Are you sure you want to decline this booking?',
        yesBtnText: 'Proceed',
        noBtnText: 'Cancel',
      },
    });

    decline.afterClosed().subscribe(({ confirm }) => {
      if (confirm) {
        this.handleUpdateStatus('declined');
      }
    });
  }

  handleUpdateStatus(status: string): void {
    this.statusLoading = true;
    this._sub.add(
      this._booking.updateBookingStatus(this.data._id, status).subscribe({
        next: (res) => {
          this.statusLoading = false;
          this._snack.open('Booking approved successfully!.', '', {
            duration: 1000,
          });
          this.closeDialog(true);
        },
        error: ({ error }) => {
          this._snack.open(error.code, '', { duration: 1000 });
          this.statusLoading = false;
        },
      })
    );
  }

  get status(): string {
    switch (this.data.status) {
      case 'for_approval':
        return 'For Approval';

      case 'upcoming':
        return 'Upcoming';

      case 'arriving':
        return 'Arriving';

      case 'current_guest':
        return 'Current Guest';

      case 'check_out':
        return 'Check Out';

      case 'cancelled':
        return 'Cancelled';

      default:
        return 'Booking Details';
    }
  }

  get imageSrc(): string {
    const src = this.data.initiatedBy?.img;
    const haveGravatar = src.includes('gravatar.com');
    return haveGravatar ? src : this._util.setImgUrl(src);
  }

  get propertySrc(): string {
    const src = this.data.bookTo?.cover;
    const haveGravatar = src.includes('gravatar.com');
    return haveGravatar ? src : this._util.setImgUrl(src);
  }

  get totalGuest(): number {
    const { adult, children, infant, pets } = this.data.details;
    return adult + children + infant + pets;
  }

  get intervalDays(): string {
    let start = moment(this.data.duration?.start, 'MM/DD/YYY');
    let end = moment(this.data.duration?.end, 'MM/DD/YYY');
    const daysDiff = end.diff(start, 'days');
    return `${daysDiff} day${daysDiff > 1 ? 's' : ''}`;
  }
}
