




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
  propertyimage: any;
  nameofproperty: any;
  guestimage: any;
  guestnames: string;
  numofguest: any;
  bookingdate:any;
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
    bookingdate:new Date(),
    numofguest: '1',
    interval: '4',
    intervalunit: 'day',
    reservationindate: new Date(),
    reseservationoutdate: new Date(),
  },
  {
 
    propertyimage: '../assets/images/main/staycation-details/gallery1.png',
    nameofproperty: 'Muntinlupa Condo Unit',
    guestimage: '../assets/images/avatars/placeholder.png',
    guestnames: 'Olivia B. Agustin',
    bookingdate:new Date(),
    numofguest: '2',
    interval: '2',
    intervalunit: 'month',
    reservationindate: new Date(),
    reseservationoutdate: new Date(),
    
  },
];

@Component({
  selector: 'app-upcoming',
  templateUrl: './upcoming.component.html',
  styleUrls: ['./upcoming.component.scss'],
  animations: [fadeInAnimation],
  encapsulation: ViewEncapsulation.None
})
export class UpcomingComponent  implements OnInit {
  title:string = 'Upcoming'
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

  viewForApprovalDetails(): void {
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

  openValidationModal(): void {
    this.dialog.open(ValidationModalComponent, {
      width:'100%',
      height:'100%',
      maxHeight:'15rem',
      maxWidth:'30rem',
      data:''
    });
  }

  
}
