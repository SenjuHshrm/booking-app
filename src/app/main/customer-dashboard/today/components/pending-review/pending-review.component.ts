import { fadeInAnimation } from 'src/app/globals/fadein-animations';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ReservationsViewComponent } from 'src/app/globals/reservations-view/reservations-view.component';
import { MatDialog } from '@angular/material/dialog';


export interface UserData {

  id: string;
  property: any;
  nameofproperty: any;
  guest:any;
  guestnames: string;
  numofguest:any;
  bookingdate: Date;
  checkindate: Date;
  checkoutdate:Date;
  interval:any;
  intervalunit:any;
  paymenttype: string;
  paidamount: number;
  balanceamount: number;

}

const PROPERTIES: any[] = [
  { image: '../assets/images/main/staycation-details/gallery1.png', nameofproperty: "Alabang Condo Unit" },
  { image: '../assets/images/main/staycation-details/gallery1.png', nameofproperty: "Muntinlupa Condo Unit" },

];
const GUESTNAMES: any[] = [
  {image:'../assets/images/avatars/placeholder.png', nameofguest:'Maia B. Bernal'},
  {image:'../assets/images/avatars/placeholder.png', nameofguest:'Olivia B. Agustin'},
  {image:'../assets/images/avatars/placeholder.png', nameofguest:'Atticus B. Belen'},
  {image:'../assets/images/avatars/placeholder.png', nameofguest:'Jack B. Acosta'},
  {image:'../assets/images/avatars/placeholder.png', nameofguest:'Charlotte B. Delacruz'},

];
const NUMBEROFGUEST: string[] = ['1'];
const BOOKINGDATE: string[] = [''];

const CHECKINOUTDATE:any[] = [
  {checkin:new Date()},
  {checkout:new Date()}
];

const INTERVAL: any[] = [
  {interval:'1', unit:'day'},
  {interval:'1', unit:'month'},
  {interval:'2', unit:'day'},
  {interval:'2', unit:'month'},
  {interval:'3', unit:'day'},
  {interval:'3', unit:'month'}
];

const PAYMENTTYPE: string[] = [
  'Awaiting payment', 
  'Fully paid', 
  'Partial pay'
];


const PAIDAMOUNT: any[] = [
  { price: '684' }, 
  { price: '626' }, 
  { price: '624' }, 
  { price: '595' }, 
  { price: '591' }, 
  { price: '595' }, 
  { price: '624' },
];

const BALANCEAMOUNT: any[] = [
  { price: '200' }, 
  { price: '300' }, 
  { price: '400' }, 
  { price: '500' }, 
  { price: '150' }, 
  { price: '300' }, 
  { price: '100' },
];


@Component({
  selector: 'app-pending-review',
  templateUrl: './pending-review.component.html',
  styleUrls: ['./pending-review.component.scss'],
  animations: [fadeInAnimation],
  encapsulation: ViewEncapsulation.None
})
export class PendingReviewComponent implements OnInit {

  public title:string = 'Upcoming';

  displayedColumns: string[] = [
    'id', 
    'property', 
    'guestnames',
    'numofguest', 
    'bookingdate', 
    'checkinoutdate', 
    'interval',
    'paymenttype', 
    'paidamount', 
    'balanceamount',
    'action'
  ];

  dataSource: MatTableDataSource<UserData>;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;



  constructor(public dialog:MatDialog) {
    const users = Array.from({ length: 100 }, (_, k) => createNewUser(k + 1));
    this.dataSource = new MatTableDataSource(users);
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }


  viewUpcoming(): void {
    const dialogRef = this.dialog.open(ReservationsViewComponent, {
      width: '99vw',
      maxWidth:'60rem', 
      height: '99vh',
      maxHeight: '47rem',
      data:this.title
    
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

function createNewUser(id: number): UserData {

  let property = PROPERTIES[Math.floor(Math.random() * PROPERTIES.length)].image;
  let propertyName = PROPERTIES[Math.floor(Math.random() * PROPERTIES.length)].nameofproperty;
  let guest = GUESTNAMES[Math.floor(Math.random() * GUESTNAMES.length)].image;
  let guestName = GUESTNAMES[Math.floor(Math.random() * GUESTNAMES.length)].nameofguest;
  let guestNumber = NUMBEROFGUEST[0];
  let checkInDate = CHECKINOUTDATE[0].checkin;
  let checkOutDate = CHECKINOUTDATE[1].checkout;
  let interVal = INTERVAL[Math.floor(Math.random() * INTERVAL.length)].interval;
  let interValUnit = INTERVAL[Math.floor(Math.random() * INTERVAL.length)].unit;
  let paytype = PAYMENTTYPE[Math.floor(Math.random() * PAYMENTTYPE.length)];
  let paidAmount = PAIDAMOUNT[Math.floor(Math.random() * PAIDAMOUNT.length)].price;
  let balanceAmount = BALANCEAMOUNT[Math.floor(Math.random() * BALANCEAMOUNT.length)].price;
  
  if(paytype !== 'Partial pay'){
    balanceAmount = 0;
  }

  if (paytype === "Awaiting payment") {
    paidAmount = 0;
  }

  return {
    id: id.toString(),
    property: property,
    nameofproperty: propertyName,
    guest: guest,
    guestnames: guestName,
    numofguest:guestNumber,
    bookingdate: new Date(),
    checkindate:checkInDate,
    checkoutdate:checkOutDate,
    interval:interVal,
    intervalunit:interValUnit,
    paymenttype: paytype,
    paidamount: paidAmount,
    balanceamount:balanceAmount
  };
}

