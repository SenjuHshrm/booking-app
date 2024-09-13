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
import { ValidationModalComponent } from '../modal/validation-modal/validation-modal.component';
import { ViewReservationModalComponent } from 'src/app/globals/modals/view-reservation-modal/view-reservation-modal.component';
import { BasicUtilService } from 'src/app/services/basic-util.service';
import { BookingService } from 'src/app/services/booking.service';
import { debounceTime, Subject, Subscription } from 'rxjs';
import { TokenService } from 'src/app/services/token.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ITokenClaims } from 'src/app/interfaces/token';
import * as moment from 'moment';

@Component({
  selector: 'app-for-approval',
  templateUrl: './for-approval.component.html',
  styleUrls: ['./for-approval.component.scss'],
  animations: [fadeInAnimation],
})
export class ForApprovalComponent implements OnInit {
  status: string = 'For Approval';
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
  total: number = 0;
  isLoading: boolean = false;
  token!: ITokenClaims;
  public searchKey: string = '';
  private _subs: Subscription = new Subscription();
  private _snack: MatSnackBar = inject(MatSnackBar);

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  UserData: any;

  private _modelChanged: Subject<string> = new Subject<string>();
  private debTime = 500;

  constructor(
    public dialog: MatDialog,
    private _util: BasicUtilService,
    private _dialog: MatDialog,
    private _changeDetector: ChangeDetectorRef,
    private _booking: BookingService,
    private _token: TokenService
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
        .getBookingByType(this.token.sub, 'for_approval', p, l, this.searchKey)
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  viewForApprovalDetails(data: any): void {
    const detail = this.dialog.open(ViewReservationModalComponent, {
      width: '99vw',
      maxWidth: '60rem',
      height: '99vh',
      maxHeight: '50rem',
      data,
    });

    detail.afterClosed().subscribe((success) => {
      if (success) {
        this._getBookings(
          this.paginator.pageSize,
          this.paginator.pageIndex + 1
        );
      }
    });
  }

  viewProfile(): void {
    this.dialog.open(ViewProfileModalComponent, {
      width: '99vw',
      maxWidth: '80rem',
      height: '99vh',
      maxHeight: '50rem',
      data: '',
    });
  }

  messageGuest(): void {
    this.dialog.open(MessageGuestModalComponent, {
      width: '99vw',
      maxWidth: '33rem',
      height: '99vh',
      maxHeight: '24rem',
      data: '',
    });
  }

  openValidationModal(): void {
    this.dialog.open(ValidationModalComponent, {
      width: '100%',
      height: '100%',
      maxHeight: '17rem',
      maxWidth: '30rem',
      data: '',
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
}
