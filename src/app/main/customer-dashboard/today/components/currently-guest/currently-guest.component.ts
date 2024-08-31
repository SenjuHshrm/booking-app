import { fadeInAnimation } from 'src/app/globals/fadein-animations';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ViewProfileModalComponent } from 'src/app/globals/modals/view-profile-modal/view-profile-modal.component';
import { MessageGuestModalComponent } from '../modal/message-guest-modal/message-guest-modal.component';
import { ValidationModalComponent } from '../modal/validation-modal/validation-modal.component';
import { ReservationsViewComponent } from 'src/app/globals/modals/reservations-view/reservations-view.component';

export interface UserData {
  id: string;
  propertyimage: any;
  nameofproperty: any;
  guestimage: any;
  guestnames: string;
  numofguest: any;
  instantbook: any; 
  bookingdate: Date;
  checkintime: any;
  checkouttime: any;
  reservationindate: any;
  reseservationoutdate: any;
  interval: any;
  intervalunit: any;
  checkindate: any;
  checkoutdate: any;
  remainingtime: any;
  paymenttype: string;
  paidamount: number;
  balanceamount: number;
  totalearnings: number;
}

const USER_DATA: UserData[] = [
  {
    id: '1',
    propertyimage: '../assets/images/main/staycation-details/gallery1.png',
    nameofproperty: 'Alabang Condo Unit',
    guestimage: '../assets/images/avatars/placeholder.png',
    guestnames: 'Maia B. Bernal',
    numofguest: '1',
    instantbook: 'On',
    bookingdate: new Date(),
    interval: '1',
    intervalunit: 'day',
    reservationindate: new Date(),
    reseservationoutdate: new Date(),
    checkindate: new Date(),
    checkoutdate: new Date(),
    checkintime: '8',
    checkouttime: '10',
    remainingtime: '0',
    paymenttype: 'Fully paid',
    paidamount: 684,
    balanceamount: 200,
    totalearnings: 0
  },
  {
    id: '2',
    propertyimage: '../assets/images/main/staycation-details/gallery1.png',
    nameofproperty: 'Muntinlupa Condo Unit',
    guestimage: '../assets/images/avatars/placeholder.png',
    guestnames: 'Olivia B. Agustin',
    numofguest: '1',
    instantbook: 'Off', 
    bookingdate: new Date(),
    interval: '1',
    intervalunit: 'month',
    reservationindate: new Date(),
    reseservationoutdate: new Date(),
    checkindate: new Date(),
    checkoutdate: new Date(),
    checkintime: '8',
    checkouttime: '10',
    remainingtime: '0',
    paymenttype: 'Partial pay',
    paidamount: 626,
    balanceamount: 300,
    totalearnings: 300
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
    'id',
    'property',
    'guestnames',
    'numofguest',
    'instantbook',
    'bookingdate',
    'reservationdate',
    'interval',
    'checkindate',
    'checkoutdate',
    'checkintime',
    'checkouttime',
    'remainingtime',
    'paymenttype',
    'paidamount',
    'balanceamount',
    'totalearnings',
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


  
}
