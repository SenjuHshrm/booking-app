import { fadeInAnimation } from 'src/app/globals/fadein-animations';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';


export interface UserData {

  id: string;
  propertyimage: any;
  nameofproperty: any;
  guestimage:any;
  guestnames: string;
  bookingdate: Date;
  checkintime: any;
  checkouttime:any;
  reservationindate:any;
  reseservationoutdate:any
  checkindate:any;
  checkoutdate:any;
  remainingtime:any;
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
const BOOKINGDATE: string[] = [''];
const ARRIVALDATE: string[] = [''];
const RESERVATIONDATE: any[] = [
  {checkin:new Date()},
  {checkout:new Date()}
]
const CHECKINOUTDATE:any[] = [
  {checkin:new Date()},
  {checkout:new Date()}
];

const ARRIVALTIME: string[] = ['8'];
const CHECKINGOUT: string[] = ['10'];
const REMAININGTIME:string[] = ['0'];
const PAYMENTTYPE: string[] = ['Fully paid', 'Partial pay'];
const BALANCEAMOUNT: any[] = [
  { price: '200' }, 
  { price: '300' }, 
  { price: '400' }, 
  { price: '500' }, 
  { price: '150' }, 
  { price: '300' }, 
  { price: '100' },
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



@Component({
  selector: 'app-checking-out',
  templateUrl: './checking-out.component.html',
  styleUrls: ['./checking-out.component.scss'],
  animations: [fadeInAnimation],
  encapsulation: ViewEncapsulation.None
})
export class CheckingOutComponent implements OnInit {
  
  dateToday:any = new Date();
  displayedColumns: string[] = [
    'id', 
    'property', 
    'guestnames', 
    'bookingdate', 
    'reservationdate',
    'checkindate',
    'checkoutdate',
    'checkintime',
    'checkouttime', 
    'paymenttype', 
    'paidamount', 
    'balanceamount',
    'action'
  ];

  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;



  constructor() {
    const users = Array.from({ length: 100 }, (_, k) => createNewUser(k + 1));
    this.dataSource = new MatTableDataSource(users);
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
}

function createNewUser(id: number): UserData {

  let propertyImage = PROPERTIES[Math.floor(Math.random() * PROPERTIES.length)].image;
  let propertyName = PROPERTIES[Math.floor(Math.random() * PROPERTIES.length)].nameofproperty;
  let guestImage = GUESTNAMES[Math.floor(Math.random() * GUESTNAMES.length)].image;
  let guestName = GUESTNAMES[Math.floor(Math.random() * GUESTNAMES.length)].nameofguest;
  let reservationInDate = RESERVATIONDATE[0].checkin;
  let reservationOutDate = RESERVATIONDATE[1].checkout;
  let checkInDate = CHECKINOUTDATE[0].checkin
  let checkOutDate = CHECKINOUTDATE[1].checkout
  let checkTime= ARRIVALTIME[0];
  let checkoutTime= CHECKINGOUT[0];
  let remainingTime= REMAININGTIME[0];
  let paymentType = PAYMENTTYPE[Math.floor(Math.random() * PAYMENTTYPE.length)];
  let paidAmount = PAIDAMOUNT[Math.floor(Math.random() * PAIDAMOUNT.length)].price;
  let balanceAmount = BALANCEAMOUNT[Math.floor(Math.random() * BALANCEAMOUNT.length)].price;
  if(paymentType !== 'Partial pay'){
    balanceAmount = 0;
  }

  return {
    id: id.toString(),
    propertyimage: propertyImage,
    nameofproperty: propertyName,
    guestimage: guestImage,
    guestnames: guestName,
    bookingdate: new Date(),
    reservationindate:reservationInDate,
    reseservationoutdate:reservationOutDate,
    checkindate:checkInDate,
    checkoutdate:checkOutDate,
    checkintime: checkTime,
    checkouttime: checkoutTime,
    remainingtime:remainingTime,
    paymenttype: paymentType,
    paidamount: paidAmount,
    balanceamount:balanceAmount
  };
}
