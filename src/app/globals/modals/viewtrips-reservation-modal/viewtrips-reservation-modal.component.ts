import {
  Component,
  ViewChild,
  ViewEncapsulation,
  OnInit,
  Inject,
  OnDestroy,
  inject,
} from '@angular/core';
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from 'swiper';
import { SwiperComponent } from 'swiper/angular';
import { fadeInAnimation } from '../../fadein-animations';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { CancelReasonModalComponent } from '../../../../../src/app/main/your-trips/modal/cancel-reason-modal/cancel-reason-modal.component';
import { Router } from '@angular/router';
import { BasicUtilService } from '../../../../../src/app/services/basic-util.service';
import { TripMessageHostComponent } from '../../../../../src/app/main/customer-dashboard/today/components/modal/trip-message-host/trip-message-host.component';
import { RateAndCommentComponent } from '../../../../../src/app/main/staycation-details/rate-and-comment/rate-and-comment.component';
import { CancellationService } from '../../../../../src/app/services/cancellation.service';
import { ConfirmationComponent } from '../../confirmation/confirmation.component';
import { BookingService } from '../../../../../src/app/services/booking.service';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

SwiperCore.use([Autoplay]);
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

@Component({
  selector: 'app-viewtrips-reservation-modal',
  templateUrl: './viewtrips-reservation-modal.component.html',
  styleUrls: ['./viewtrips-reservation-modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [fadeInAnimation],
})
export class ViewtripsReservationModalComponent implements OnInit, OnDestroy {
  public paymentDetails: any[] = [
    {
      bookedguest: 'Juan Dela Cruz',
      bookeddate: 'September 15, 2024',
      checkin: 'September 15, 2024',
      checkout: 'September 20, 2024',
      numberguest: '5',
    },
  ];

  private _subs: Subscription = new Subscription();
  private _snack: MatSnackBar = inject(MatSnackBar);

  public isLoading: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<ViewtripsReservationModalComponent>,
    public dialog: MatDialog,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _util: BasicUtilService,
    private _cp: CancellationService,
    private _booking: BookingService
  ) {}
  @ViewChild('swiper', { static: false }) swiper?: SwiperComponent;

  ngOnInit() {}

  ngOnDestroy(): void {
    if (!this._subs) return;
    this._subs.unsubscribe();
  }

  public validCancel(): void {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      width: '100%',
      maxWidth: '30rem',
      data: {
        title:
          this.data.status === 'for_approval'
            ? 'Cancel Booking'
            : 'Request Cancellation',
        description: `Are you sure you want to cancel this booking?
        Property: ${this.data.bookTo?.name}`,
        yesBtnText: 'Yes',
        noBtnText: 'No',
      },
    });

    dialogRef.afterClosed().subscribe(({ confirm }) => {
      if (confirm) {
        if (this.data.status === 'for_approval') {
          const cancelData = {
            bookingId: this.data._id,
          };
          this.isLoading = true;
          this._subs.add(
            this._booking.cancelBooking(cancelData).subscribe({
              next: () => {
                this.isLoading = false;
                this._snack.open('Booking successfully cancelled.', '', {
                  duration: 1000,
                });
                this.closeDialog(true);
              },
              error: ({ error }) => {
                this._snack.open(
                  error?.msg || error?.code || 'Failed to cancel the booking.',
                  '',
                  { duration: 1000 }
                );
                this.isLoading = false;
              },
            })
          );
        } else {
          this.reasonCancel();
        }
      }
    });
  }

  private reasonCancel(): void {
    const dialogRef = this.dialog.open(CancelReasonModalComponent, {
      disableClose: true,
      panelClass: 'custom-cancell-dialog',
      width: '100%',
      height: 'fit-content',
      maxHeight: '90vh',
      maxWidth: '45rem',
      data: this.data._id,
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }

  public goToSearchList(): void {
    this.router.navigate(['main/staycation-list']);
    this.closeDialog();
  }

  closeDialog(success: boolean = false): void {
    if (this.isLoading) return;
    this.dialogRef.close(success);
  }

  setSrc(src: string): string {
    return this._util.setImgUrl(src);
  }

  messageProprietor(): void {
    this.dialog.open(TripMessageHostComponent, {
      width: '99vw',
      maxWidth: '33rem',
      height: '99vh',
      maxHeight: '28rem',
      data: this.data.bookTo.host._id,
      disableClose: true,
    });
  }

  get hostName(): string {
    return this._util.constructName(this.data.bookTo.host.name);
  }

  get guestName(): string {
    return this.data.initiatedBy.fullName;
  }

  get totalGuest(): number {
    const { adult, children, infant, pets } = this.data.details;
    return adult + children + infant + pets;
  }

  get cancellationPolicy(): string {
    return this._cp.getPolicyDesc(this.data.cancellationPolicy);
  }

  get cancellationPolicyTitle(): string {
    return this._cp.getPolicyTitle(this.data.cancellationPolicy);
  }

  rateAndComment(): void {
    const create = this.dialog.open(RateAndCommentComponent, {
      panelClass: 'custom-addrate-dialog',
      data: {
        host: {
          name: this.hostName,
        },
        staycationId: this.data.bookTo._id,
      },
    });
  }

  get fullAddress(): string {
    return this._util.constructAddress(this.data.bookTo.address);
  }

  get title(): string {
    switch (this.data.status) {
      case 'for_approval':
        return 'Pending Reservation';

      case 'upcoming':
        return 'Upcoming Reservation';

      case 'arriving':
        return 'Arriving Reservation';

      case 'current_guest':
        return 'Reservation In Progress';

      case 'check_out':
        return 'Completed Reservation';

      case 'cancelled':
        return 'Cancelled Reservation';

      default:
        return 'Booking Details';
    }
  }
}
