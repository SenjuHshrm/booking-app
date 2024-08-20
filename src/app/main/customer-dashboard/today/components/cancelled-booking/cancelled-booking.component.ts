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
  cancelleddate: Date;
  reasons:string;
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

const REASONS: any[] = ['Lorem ipsum dolor','Lorem ipsum dolor','Lorem ipsum dolor'];

const DATE: any[] = [
  {cancelleddate:new Date()}
];



@Component({
  selector: 'app-cancelled-booking',
  templateUrl: './cancelled-booking.component.html',
  styleUrls: ['./cancelled-booking.component.scss'],
  animations: [fadeInAnimation],
  encapsulation: ViewEncapsulation.None
})
export class CancelledBookingComponent implements OnInit {
  
  dateToday:any = new Date();
  displayedColumns: string[] = [
    'id', 
    'property', 
    'guestnames',
    'date',
    'reasons',
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
  let cancelledDate = DATE[Math.floor(Math.random() * DATE.length)].cancelleddate;
  let reaSons = REASONS[Math.floor(Math.random() * REASONS.length)];
 
  return {
    id: id.toString(),
    propertyimage: propertyImage,
    nameofproperty: propertyName,
    guestimage: guestImage,
    guestnames: guestName,
    cancelleddate:cancelledDate,
    reasons: reaSons

  };
}
