import { fadeInAnimation } from 'src/app/globals/fadein-animations';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';


export interface UserData {
  id: string;
  property: any;
  nameofproperty: any;
  guest:any;
  guestnames: string;
  guestrate: any;
  guestcommenst: string;

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

const GUESTRATE: any[] = [
  {},
  {},
  {},
  {},
  {}
];

const GUESTCOMMENTS: string[] = [''];


@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss'],
  animations: [fadeInAnimation],
  encapsulation: ViewEncapsulation.None
})
export class ReviewsComponent implements OnInit {

  displayedColumns: string[] = [
    'id', 
    'property', 
    'guestnames',
    'guestrate', 
    'guestcomment', 
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

  let property = PROPERTIES[Math.floor(Math.random() * PROPERTIES.length)].image;
  let propertyName = PROPERTIES[Math.floor(Math.random() * PROPERTIES.length)].nameofproperty;
  let guest = GUESTNAMES[Math.floor(Math.random() * GUESTNAMES.length)].image;
  let guestName = GUESTNAMES[Math.floor(Math.random() * GUESTNAMES.length)].nameofguest;
  let guestRate =GUESTRATE[Math.floor(Math.random() * GUESTRATE.length)].star


  return {
    id: id.toString(),
    property: property,
    nameofproperty: propertyName,
    guest: guest,
    guestnames: guestName,
    guestrate:guestRate,
    guestcommenst: '',
  };
}
