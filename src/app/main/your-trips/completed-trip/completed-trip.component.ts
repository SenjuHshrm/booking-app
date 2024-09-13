import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { fadeInAnimation } from '../../../../../src/app/globals/fadein-animations';
import { MatDialog } from '@angular/material/dialog';
import { ViewtripsReservationModalComponent } from '../../../../../src/app/globals/modals/viewtrips-reservation-modal/viewtrips-reservation-modal.component';
import { debounceTime, Subject, Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BookingService } from '../../../../../src/app/services/booking.service';
import { BasicUtilService } from '../../../../../src/app/services/basic-util.service';

@Component({
  selector: 'app-completed-trip',
  templateUrl: './completed-trip.component.html',
  styleUrls: ['./completed-trip.component.scss'],
  animations: [fadeInAnimation],
})
export class CompletedTripComponent implements OnInit {
  public notFound: boolean = false;
  public searchInputs: string = '';

  public initialLoading: boolean = false;
  public seeMoreLoading: boolean = false;
  public hasNextPage: boolean = false;

  private _subs: Subscription = new Subscription();
  private _snack: MatSnackBar = inject(MatSnackBar);

  public searchKey: string = '';
  public bookings: any = [];
  public page: number = 1;
  public limit: number = 15;
  public total: number = 0;

  private _modelChanged: Subject<string> = new Subject<string>();
  private debTime = 500;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private _booking: BookingService,
    private _util: BasicUtilService
  ) {}

  ngOnInit(): void {
    this.initialLoading = true;
    this._getBookings(this.limit, this.page);
    this._subs.add(
      this._modelChanged.pipe(debounceTime(this.debTime)).subscribe(() => {
        this.initialLoading = true;
        this.bookings = [];
        this._getBookings(this.limit, 1);
        this.page = 1;
      })
    );
  }

  ngOnDestroy(): void {
    if (!this._subs) return;
    this._subs.unsubscribe();
  }

  public handleSearch(e: any) {
    this._modelChanged.next(e.target.value);
  }

  public _getBookings(l: number, p: number): any {
    this._subs.add(
      this._booking
        .getBookingsByGuestId(l, p, 'check_out', this.searchKey)
        .subscribe({
          next: (res) => {
            this.bookings = [...res.bookings, ...this.bookings];
            this.total = res.totalCount;
            this.hasNextPage = (p - 1) * l + l < this.total;
            this.initialLoading = false;
            this.seeMoreLoading = false;
          },
          error: ({ error }) => {
            this._snack.open(
              error.code ||
                'Failed to get upcoming trips. Please reload the page.'
            );
            this.initialLoading = false;
            this.seeMoreLoading = false;
          },
        })
    );
  }

  setSrc(src: string): string {
    return this._util.setImgUrl(src);
  }

  public seeMoreBookings(): void {
    if (this.initialLoading || this.seeMoreLoading || !this.hasNextPage) return;
    this.page++;
    this.seeMoreLoading = true;
    this._getBookings(this.limit, this.page);
  }

  public viewDetails(book: any): void {
    const dialogRef = this.dialog.open(ViewtripsReservationModalComponent, {
      width: '100%',
      height: '100%',
      maxHeight: '57rem',
      maxWidth: '57rem',
      panelClass: 'custom-viewdetrips-dialog',
      data: book,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.bookings = this.bookings.filter(
          (item: any) => item._id !== book._id
        );
      }
    });
  }

  public navigateToBookStaycation(id: string): void {
    this.router.navigate(['main/staycation-details', id]);
  }

  public gotoStaycationDetails(): void {
    this.router.navigate(['/main/staycation-details/66d71c6d4cb5d6b2e0360398']);
    console.log('Active');
  }
}
