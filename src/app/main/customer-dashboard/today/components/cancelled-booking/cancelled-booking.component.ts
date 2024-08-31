import { fadeInAnimation } from 'src/app/globals/fadein-animations';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ReservationsViewComponent } from 'src/app/globals/modals/reservations-view/reservations-view.component';
import { ViewProfileModalComponent } from 'src/app/globals/modals/view-profile-modal/view-profile-modal.component';
import { MessageGuestModalComponent } from '../modal/message-guest-modal/message-guest-modal.component';
import { MatDialog } from '@angular/material/dialog';

export interface UserData {
  id: string;
  propertyimage: any;
  nameofproperty: any;
  guestimage: any;
  guestnames: string;
  cancelleddate: Date;
  reasons: string;
}

const USER_DATA: UserData[] = [
  {
    id: '1',
    propertyimage: '../assets/images/main/staycation-details/gallery1.png',
    nameofproperty: 'Alabang Condo Unit',
    guestimage: '../assets/images/avatars/placeholder.png',
    guestnames: 'Maia B. Bernal',
    cancelleddate: new Date(),
    reasons: 'Lorem ipsum dolor'
  },
  {
    id: '2',
    propertyimage: '../assets/images/main/staycation-details/gallery1.png',
    nameofproperty: 'Muntinlupa Condo Unit',
    guestimage: '../assets/images/avatars/placeholder.png',
    guestnames: 'Olivia B. Agustin',
    cancelleddate: new Date(),
    reasons: 'Lorem ipsum dolor'
  },
  {
    id: '3',
    propertyimage: '../assets/images/main/staycation-details/gallery1.png',
    nameofproperty: 'Muntinlupa Condo Unit',
    guestimage: '../assets/images/avatars/placeholder.png',
    guestnames: 'Atticus B. Belen',
    cancelleddate: new Date(),
    reasons: 'Lorem ipsum dolor'
  },
  {
    id: '4',
    propertyimage: '../assets/images/main/staycation-details/gallery1.png',
    nameofproperty: 'Muntinlupa Condo Unit',
    guestimage: '../assets/images/avatars/placeholder.png',
    guestnames: 'Jack B. Acosta',
    cancelleddate: new Date(),
    reasons: 'Lorem ipsum dolor'
  },
  {
    id: '5',
    propertyimage: '../assets/images/main/staycation-details/gallery1.png',
    nameofproperty: 'Muntinlupa Condo Unit',
    guestimage: '../assets/images/avatars/placeholder.png',
    guestnames: 'Charlotte B. Delacruz',
    cancelleddate: new Date(),
    reasons: 'Lorem ipsum dolor'
  },
];

@Component({
  selector: 'app-cancelled-booking',
  templateUrl: './cancelled-booking.component.html',
  styleUrls: ['./cancelled-booking.component.scss'],
  animations: [fadeInAnimation],
  encapsulation: ViewEncapsulation.None,
})
export class CancelledBookingComponent implements OnInit {
    title:string = 'Cancelled'
  dateToday: any = new Date();
  displayedColumns: string[] = [
    'id',
    'property',
    'guestnames',
    'date',
    'reasons',
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
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
