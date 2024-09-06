import { fadeInAnimation } from 'src/app/globals/fadein-animations';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ViewProfileModalComponent } from 'src/app/globals/modals/view-profile-modal/view-profile-modal.component';
import { MessageGuestModalComponent } from '../modal/message-guest-modal/message-guest-modal.component';
import { ValidationModalComponent } from '../modal/validation-modal/validation-modal.component';
import { ReservationsViewComponent } from 'src/app/globals/modals/reservations-view/reservations-view.component';
import { ViewGuestCheckoutModalComponent } from 'src/app/globals/modals/view-guest-checkout-modal/view-guest-checkout-modal.component';

export interface UserData {
 
  propertyimage: any;
  nameofproperty: any;
  guestimage: any;
  guestnames: string;
  numofguest: any;
  instantbook: any; 
  bookingdate: Date;
  reservationindate: any;
  reseservationoutdate: any;
  interval: any;
  intervalunit: any;
}

const USER_DATA: UserData[] = [
  {
    propertyimage: '../assets/images/main/staycation-details/gallery1.png',
    nameofproperty: 'Alabang Condo Unit',
    guestimage: '../assets/images/avatars/placeholder.png',
    guestnames: 'Maia B. Bernal',
    numofguest: 1,
    instantbook: 'On',
    bookingdate: new Date(),
    interval: '1',
    intervalunit: 'day',
    reservationindate: new Date(),
    reseservationoutdate: new Date(),
  },
  {

    propertyimage: '../assets/images/main/staycation-details/gallery1.png',
    nameofproperty: 'Muntinlupa Condo Unit',
    guestimage: '../assets/images/avatars/placeholder.png',
    guestnames: 'Olivia B. Agustin',
    numofguest: 1,
    instantbook: 'Off', 
    bookingdate: new Date(),
    interval: '1',
    intervalunit: 'month',
    reservationindate: new Date(),
    reseservationoutdate: new Date(),
  },
];

@Component({
  selector: 'app-currently-guest',
  templateUrl: './currently-guest.component.html',
  styleUrls: ['./currently-guest.component.scss'],
  animations: [fadeInAnimation],
  encapsulation: ViewEncapsulation.None,
})
export class CurrentlyGuestComponent implements OnInit {
  title:string = 'Current guest'
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

  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(public dialog:MatDialog) {
    this.dataSource = new MatTableDataSource(USER_DATA);
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  viewDetails(): void {
    this.dialog.open(ReservationsViewComponent, {
      width: '99vw',
      maxWidth:'60rem', 
      height: '99vh',
      maxHeight: '50rem',
      data:this.title
    
    });
  }


  viewProfile(): void {
    this.dialog.open(ViewProfileModalComponent, {
      width: '99vw',
      maxWidth:'80rem', 
      height: '99vh',
      maxHeight: '50rem',
      data:''
    
    });
  }

  messageGuest():void{
    this.dialog.open(MessageGuestModalComponent, {
      width: '99vw',
      maxWidth:'33rem', 
      height: '99vh',
      maxHeight: '24rem',
      data:''
    
    });
  }


  viewGuestCheckout(): void {
    this.dialog.open(ViewGuestCheckoutModalComponent, {
      width: '99vw',
      maxWidth:'60rem', 
      height: 'auto',
      maxHeight: '50rem',
      data:this.title,

    
    });
  }


  
}
