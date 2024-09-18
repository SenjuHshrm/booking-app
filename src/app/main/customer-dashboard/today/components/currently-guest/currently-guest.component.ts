import { switchMap, catchError } from 'rxjs/operators';
import { AuthService } from './../../../../../services/auth.service';
import { fadeInAnimation } from 'src/app/globals/fadein-animations';
import {
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ViewProfileModalComponent } from 'src/app/globals/modals/view-profile-modal/view-profile-modal.component';
import { MessageGuestModalComponent } from '../modal/message-guest-modal/message-guest-modal.component';
import {
  Guest,
  ViewGuestCheckoutModalComponent,
} from 'src/app/globals/modals/view-guest-checkout-modal/view-guest-checkout-modal.component';
import { ViewReservationModalComponent } from 'src/app/globals/modals/view-reservation-modal/view-reservation-modal.component';
import { BasicUtilService } from 'src/app/services/basic-util.service';
import { BookingService } from 'src/app/services/booking.service';
import { TokenService } from 'src/app/services/token.service';
import { ITokenClaims } from 'src/app/interfaces/token';
import { debounceTime, Subject, Subscription, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { ConfirmationComponent } from 'src/app/globals/confirmation/confirmation.component';

@Component({
  selector: 'app-currently-guest',
  templateUrl: './currently-guest.component.html',
  styleUrls: ['./currently-guest.component.scss'],
  animations: [fadeInAnimation],
  encapsulation: ViewEncapsulation.None,
})
export class CurrentlyGuestComponent implements OnInit {
  title: string = 'Current guest';
  dateToday: any = new Date();
  displayedColumns: string[] = [
    'property',
    'guestnames',
    'numofguest',
    'bookingdate',
    'reservationdate',
    'interval',
    'action',
  ];

  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  private token!: ITokenClaims;
  private _subs: Subscription = new Subscription();
  private _modelChanged: Subject<string> = new Subject<string>();
  private debTime = 500;
  private _snack: MatSnackBar = inject(MatSnackBar);

  public total: number = 0;
  public isLoading: boolean = false;
  public statusLoading: boolean = false;
  public searchKey: string = '';

  constructor(
    public dialog: MatDialog,
    private _util: BasicUtilService,
    private _changeDetector: ChangeDetectorRef,
    private _booking: BookingService,
    private _token: TokenService,
    private _auth: AuthService
  ) {}

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.token = <ITokenClaims>this._token.decodedToken();
    this._subs.add(
      this._modelChanged.pipe(debounceTime(this.debTime)).subscribe(() => {
        this._getBookings(
          this.paginator.pageSize,
          this.paginator.pageIndex + 1
        );
      })
    );
  }

  ngAfterViewInit(): void {
    this._getBookings(this.paginator.pageSize, this.paginator.pageIndex + 1);
    this.dataSource.paginator = this.paginator;
    this._changeDetector.detectChanges();
  }

  _getBookings(l: number, p: number): void {
    this.dataSource = new MatTableDataSource<any>([]);
    this.isLoading = true;
    this._subs.add(
      this._booking
        .getBookingByType(this.token.sub, 'current_guest', p, l, this.searchKey)
        .subscribe({
          next: (res) => {
            this.dataSource = res.bookings;
            this.total = res.totalCount;
            this.isLoading = false;
          },
          error: (error) => {
            this._snack.open(error.error.code, '', { duration: 1000 });
            this.isLoading = false;
          },
        })
    );
  }

  public handleSearch(e: any) {
    this._modelChanged.next(e.target.value);
  }

  public handlePageChange(e: PageEvent) {
    this._getBookings(e.pageSize, e.pageIndex + 1);
  }

  viewDetails(data: any): void {
    this.dialog.open(ViewReservationModalComponent, {
      width: '99vw',
      maxWidth: '60rem',
      height: '99vh',
      maxHeight: '50rem',
      data,
    });
  }

  viewProfile(guestId: string): void {
    this.dialog.open(ViewProfileModalComponent, {
      disableClose: true,
      panelClass: 'custom-view-profile-dialog',
      data: guestId,
    });
  }

  messageGuest(guest: any): void {
    this.dialog.open(MessageGuestModalComponent, {
      width: '99vw',
      maxWidth: '33rem',
      height: '99vh',
      maxHeight: '27rem',
      data: guest,
    });
  }

  viewGuestCheckout(bookingId: string): void {
    this.dialog.open(ViewGuestCheckoutModalComponent, {
      width: '99vw',
      maxWidth: '60rem',
      height: 'auto',
      maxHeight: '50rem',
      data: bookingId,
    });
  }

  setSrc(src: string): string {
    const haveGravatar = src.includes('gravatar.com');
    return haveGravatar ? src : this._util.setImgUrl(src);
  }

  setTotalGuest(data: any): number {
    const { adult, children, infant, pets } = data;
    return adult + children + infant + pets;
  }

  setInterval(data: any): string {
    let start = moment(data.start, 'MM/DD/YYY');
    let end = moment(data.end, 'MM/DD/YYY');
    const daysDiff = end.diff(start, 'days');
    return `${daysDiff} day${daysDiff > 1 ? 's' : ''}`;
  }

  checkOutBooking(data: any): void {
    const checkOut = this.dialog.open(ConfirmationComponent, {
      width: '100%',
      maxWidth: '30rem',
      data: {
        title: 'Guest Check Out',
        description: `Do you want to confirm this guest check-out?
        Guest: ${data.initiatedBy?.fullName}
        Property: ${data.bookTo?.name}`,
        yesBtnText: 'Yes',
        noBtnText: 'No',
      },
    });

    checkOut.afterClosed().subscribe(({ confirm }) => {
      if (confirm) {
        this.statusLoading = true;
        this._subs.add(
          this._auth
            .csrfToken()
            .pipe(
              switchMap((x) =>
                this._booking.bookingCheckOut(data._id, x.token)
              ),
              catchError((e) => throwError(() => e))
            )
            .subscribe({
              next: (res) => {
                this._getBookings(
                  this.paginator.pageSize,
                  this.paginator.pageIndex + 1
                );
                this.statusLoading = false;
                this._snack.open('Checked-out successfully!', '', {
                  duration: 1000,
                });
              },
              error: ({ error }) => {
                this._snack.open(
                  error.msg ||
                    error.code ||
                    'Failed to complete the check-out process.',
                  'Ok'
                );
                this.statusLoading = false;
              },
            })
        );
      }
    });
  }
}
