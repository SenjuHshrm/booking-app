import { fadeInAnimation } from 'src/app/globals/fadein-animations';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  inject,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ViewProfileModalComponent } from 'src/app/globals/modals/view-profile-modal/view-profile-modal.component';
import { MessageGuestModalComponent } from '../modal/message-guest-modal/message-guest-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { ViewReservationModalComponent } from 'src/app/globals/modals/view-reservation-modal/view-reservation-modal.component';
import { ValidationModalComponent } from '../modal/validation-modal/validation-modal.component';
import { ITokenClaims } from 'src/app/interfaces/token';
import {
  catchError,
  debounceTime,
  Subject,
  Subscription,
  switchMap,
  throwError,
} from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BasicUtilService } from 'src/app/services/basic-util.service';
import { BookingService } from 'src/app/services/booking.service';
import { TokenService } from 'src/app/services/token.service';
import { AuthService } from 'src/app/services/auth.service';
import * as moment from 'moment';
import { ConfirmationComponent } from 'src/app/globals/confirmation/confirmation.component';

export interface UserData {
  propertyimage: any;
  nameofproperty: any;
  guestimage: any;
  guestnames: string;
  status: any;
  // cancelleddate: Date;
  reasons: string;
}

@Component({
  selector: 'app-cancelled-booking',
  templateUrl: './cancelled-booking.component.html',
  styleUrls: ['./cancelled-booking.component.scss'],
  animations: [fadeInAnimation],
  encapsulation: ViewEncapsulation.None,
})
export class CancelledBookingComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  title: string = 'Cancelled';
  dateToday: any = new Date();
  displayedColumns: string[] = [
    // 'id',
    'property',
    'guestnames',
    'status',
    'reasons',
    'action',
  ];

  dataSource = new MatTableDataSource<any>([]);

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

  ngOnDestroy(): void {
    if (!this._subs) return;
    this._subs.unsubscribe();
  }

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
        .getCancelledBookings(this.token.sub, p, l, this.searchKey)
        .subscribe({
          next: (res) => {
            this.dataSource = new MatTableDataSource<any>(res.bookings);
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

  handleTableChanges(newStatus: string, id: String) {
    const tableData: any = this.dataSource.data;
    const index = tableData.findIndex((item: any) => item._id === id);
    if (index !== -1) {
      tableData[index] = {
        ...tableData[index],
        cancel: {
          ...tableData[index].cancel,
          status: newStatus,
        },
      };
      this.dataSource.data = [...tableData];
    }
  }

  approveCancellation(data: any): void {
    const name = data.initiatedBy?.fullName;
    const property = data.bookTo.name;
    const approve = this.dialog.open(ConfirmationComponent, {
      width: '100%',
      maxWidth: '25rem',
      data: {
        title: 'Approve Cancellation',
        description: `Are you sure you want to approve the cancellation of this booking?
        Guest: ${name}
        Property: ${property}`,
        yesBtnText: 'Proceed',
        noBtnText: 'Cancel',
      },
    });

    approve.afterClosed().subscribe(({ confirm }) => {
      if (confirm) {
        const cancelId = data.cancel._id;
        const bookingId = data._id;
        this.statusLoading = true;
        this._subs.add(
          this._auth
            .csrfToken()
            .pipe(
              switchMap((x) =>
                this._booking.approveCancellation(bookingId, cancelId, x.token)
              ),
              catchError((e) => throwError(() => e))
            )
            .subscribe({
              next: (res) => {
                this.statusLoading = false;
                this.handleTableChanges(res.cancelStatus, data._id);
                this._snack.open('Approved successfully!', '', {
                  duration: 1000,
                });
              },
              error: ({ error }) => {
                this._snack.open(
                  error.msg ||
                    error.code ||
                    'Failed to deny the booking cancellation request.',
                  'Ok'
                );
                this.statusLoading = false;
              },
            })
        );
      }
    });
  }

  denyCancellation(data: any): void {
    const name = data.initiatedBy?.fullName;
    const property = data.bookTo.name;
    this.statusLoading = true;
    const deny = this.dialog.open(ConfirmationComponent, {
      width: '100%',
      maxWidth: '25rem',
      data: {
        title: 'Deny Cancellation',
        description: `Are you sure you want to deny the cancellation of this booking?
        Guest: ${name}
        Property: ${property}`,
        yesBtnText: 'Proceed',
        noBtnText: 'Cancel',
      },
    });

    deny.afterClosed().subscribe(({ confirm }) => {
      if (confirm) {
        const cancelId = data.cancel._id;
        const bookingId = data._id;

        this._subs.add(
          this._auth
            .csrfToken()
            .pipe(
              switchMap((x) =>
                this._booking.denyCancellation(bookingId, cancelId, x.token)
              ),
              catchError((e) => throwError(() => e))
            )
            .subscribe({
              next: (res) => {
                this.statusLoading = false;
                this.handleTableChanges(res.cancelStatus, data._id);
                this._snack.open('Denied successfully!', '', {
                  duration: 1000,
                });
              },
              error: ({ error }) => {
                this._snack.open(
                  error.msg ||
                    error.code ||
                    'Failed to deny the booking cancellation request.',
                  'Ok'
                );
                this.statusLoading = false;
              },
            })
        );
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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
}
