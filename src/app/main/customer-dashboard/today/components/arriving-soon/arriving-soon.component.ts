import { fadeInAnimation } from 'src/app/globals/fadein-animations';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ReservationsViewComponent } from 'src/app/globals/reservations-view/reservations-view.component';
import { MatDialog } from '@angular/material/dialog';


export interface UserData {
  id: string;
  propertyimage: any;
  nameofproperty: any;
  guestimage:any;
  guestnames: string;
  numofguest:any;
  bookingdate: Date;
  interval:any;
  intervalunit:any;
  checkindate: Date;
  checkoutdate:Date;
  arrivaltime: any;
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

const INTERVAL: any[] = [
  {interval:'1', unit:'day'},
  {interval:'1', unit:'month'},
  {interval:'2', unit:'day'},
  {interval:'2', unit:'month'},
  {interval:'3', unit:'day'},
  {interval:'3', unit:'month'}
];

const CHECKINOUTDATE:any[] = [
  {checkin:new Date()},
  {checkout:new Date()}
];

const ARRIVALTIME: any[] = ['0'];

const PAYMENTTYPE: string[] = [
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
  selector: 'app-arriving-soon',
  templateUrl: './arriving-soon.component.html',
  styleUrls: ['./arriving-soon.component.scss'],
  animations: [fadeInAnimation],
  encapsulation: ViewEncapsulation.None
})
export class ArrivingSoonComponent implements OnInit {
  
  dateToday:any = new Date();
  public title:string = 'Arriving';
  displayedColumns: string[] = [
    'id', 
    'property', 
    'guestnames',
    'numofguest', 
    'bookingdate',
    'checkinoutdate',
    'interval', 
    'arrivaltime', 
    'paymenttype', 
    'paidamount', 
    'balanceamount',
    'action'
  ];

  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;



  constructor(public dialog:MatDialog){
    const users = Array.from({ length: 100 }, (_, k) => createNewUser(k + 1));
    this.dataSource = new MatTableDataSource(users);
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  viewArriving(): void {
    const dialogRef = this.dialog.open(ReservationsViewComponent, {
      width: '99vw',
      maxWidth:'60rem', 
      height: '99vh',
      maxHeight: '47rem',
      data:this.title
    
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

  const propertyImage = PROPERTIES[Math.floor(Math.random() * PROPERTIES.length)].image;
  const propertyName = PROPERTIES[Math.floor(Math.random() * PROPERTIES.length)].nameofproperty;
  const guestImage = GUESTNAMES[Math.floor(Math.random() * GUESTNAMES.length)].image;
  let guestName = GUESTNAMES[Math.floor(Math.random() * GUESTNAMES.length)].nameofguest;
  let guestNumber = NUMBEROFGUEST[0];
  let interVal = INTERVAL[Math.floor(Math.random() * INTERVAL.length)].interval;
  let interValUnit = INTERVAL[Math.floor(Math.random() * INTERVAL.length)].unit;
  let checkInDate = CHECKINOUTDATE[0].checkin;
  let checkOutDate = CHECKINOUTDATE[1].checkout;
  let arrivalTime= ARRIVALTIME[Math.floor(Math.random() * ARRIVALTIME.length)];
  let paymentType = PAYMENTTYPE[Math.floor(Math.random() * PAYMENTTYPE.length)];
  let paidAmount = PAIDAMOUNT[Math.floor(Math.random() * PAIDAMOUNT.length)].price;
  let balanceAmount = BALANCEAMOUNT[Math.floor(Math.random() * BALANCEAMOUNT.length)].price;

  if(paymentType !== 'Partial pay'){
    balanceAmount = 0;
  }
  
  if (paymentType === "Awaiting payment") {
    paidAmount = 0;
  }

  return {
    id: id.toString(),
    propertyimage: propertyImage,
    nameofproperty: propertyName,
    guestimage: guestImage,
    guestnames: guestName,
    numofguest:guestNumber,
    bookingdate: new Date(),
    interval:interVal,
    intervalunit:interValUnit,
    checkindate:checkInDate,
    checkoutdate:checkOutDate,
    arrivaltime: arrivalTime,
    paymenttype: paymentType,
    paidamount: paidAmount,
    balanceamount:balanceAmount
  };
}
