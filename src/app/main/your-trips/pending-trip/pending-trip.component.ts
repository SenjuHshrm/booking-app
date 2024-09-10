

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { fadeInAnimation } from 'src/app/globals/fadein-animations';
import { MatDialog } from '@angular/material/dialog';

import { CancelReasonModalComponent } from '../modal/cancel-reason-modal/cancel-reason-modal.component';
import { ViewtripsReservationModalComponent } from 'src/app/globals/modals/viewtrips-reservation-modal/viewtrips-reservation-modal.component';

interface DataItem {
  _id: string;
  image: string;
  title: string;
  description: string;
  price_per_night: number;
  bookedDate:string,
  status: string;
  startdate: string;
  enddate:string;
  rating:any;
  reviews:any;
  address:any;
}

@Component({
  selector: 'app-pending-trip',
  templateUrl: './pending-trip.component.html',
  styleUrls: ['./pending-trip.component.scss'],
  animations: [fadeInAnimation]
})
export class PendingTripComponent implements OnInit {
  
  public filteredItems: DataItem[] = [];
  public notFound: boolean = false;
  public searchInputs: string = '';
 

  public yourTrips: DataItem[] = [
    { 
      _id: '0', 
      image: '../assets/images/main/staycation-details/gallery1.png', 
      title: 'Our house in Tagaytay', 
      description: 'Our condo', 
      price_per_night: 1200, 
      bookedDate:'2021-9-1',
      startdate: '2024-10-30', 
      enddate:'2024-11-30',
      rating:5,
      reviews:100,
      status: 'Pending Trips',
      address:'San Pablo City. Laguna'
    },
    { 
      _id: '0', 
      image: '../assets/images/main/staycation-details/gallery1.png', 
      title: 'Our house in Tagaytay', 
      description: 'Our condo', 
      price_per_night: 1200, 
      bookedDate:'2021-9-1',
      startdate: '2024-10-30', 
      enddate:'2024-11-30',
      rating:5,
      reviews:100,
      status: 'Pending Trips',
      address:'San Pablo City. Laguna'
    },
    { 
      _id: '0', 
      image: '../assets/images/main/staycation-details/gallery1.png', 
      title: 'Our house in Tagaytay', 
      description: 'Our condo', 
      price_per_night: 1200, 
      bookedDate:'2021-9-1',
      startdate: '2024-10-30', 
      enddate:'2024-11-30',
      rating:5,
      reviews:100,
      status: 'Pending Trips',
      address:'San Pablo City. Laguna'
    },
    { 
      _id: '0', 
      image: '../assets/images/main/staycation-details/gallery1.png', 
      title: 'Our house in Tagaytay', 
      description: 'Our condo', 
      price_per_night: 1200, 
      bookedDate:'2021-9-1',
      startdate: '2024-10-30', 
      enddate:'2024-11-30',
      rating:5,
      reviews:100,
      status: 'Pending Trips',
      address:'San Pablo City. Laguna'
    },
    { 
      _id: '0', 
      image: '../assets/images/main/staycation-details/gallery1.png', 
      title: 'Our house in Tagaytay', 
      description: 'Our condo', 
      price_per_night: 1200, 
      bookedDate:'2021-9-1',
      startdate: '2024-10-30', 
      enddate:'2024-11-30',
      rating:5,
      reviews:100,
      status: 'Pending Trips',
      address:'San Pablo City. Laguna'
    },
    { 
      _id: '0', 
      image: '../assets/images/main/staycation-details/gallery1.png', 
      title: 'Our house in Tagaytay', 
      description: 'Our condo', 
      price_per_night: 1200, 
      bookedDate:'2021-9-1',
      startdate: '2024-10-30', 
      enddate:'2024-11-30',
      rating:5,
      reviews:100,
      status: 'Pending Trips',
      address:'San Pablo City. Laguna'
    },
    { 
      _id: '0', 
      image: '../assets/images/main/staycation-details/gallery1.png', 
      title: 'Our house in Tagaytay', 
      description: 'Our condo', 
      price_per_night: 1200, 
      bookedDate:'2021-9-1',
      startdate: '2024-10-30', 
      enddate:'2024-11-30',
      rating:5,
      reviews:100,
      status: 'Pending Trips',
      address:'San Pablo City. Laguna'
    },



  ];

  public originalItems: DataItem[] = [...this.yourTrips];


  constructor(private router: Router, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.filteredItems = [...this.yourTrips];
  }

  public filterItems(query: string): void {
    console.log('Filtering with query:', query);
    if (query) {
      const lowerCaseQuery = query.toLowerCase();
      this.filteredItems = this.yourTrips.filter((item: DataItem) =>
        item.title.toLowerCase().includes(lowerCaseQuery) ||
        item.description.toLowerCase().includes(lowerCaseQuery) ||
        item.price_per_night.toString().includes(query)
      );
      this.notFound = this.filteredItems.length === 0;
    } else {
      this.filteredItems = [...this.yourTrips];
      this.notFound = false;
    }
  }

  public navigateToBookStaycation(id: string): void {
    this.router.navigate(['main/staycation-details', id]);
  }





  public gotoStaycationDetails():void{
    this.router.navigate(['/main/staycation-details/66d71c6d4cb5d6b2e0360398']);
    console.log("Active")
}


  // public removeTrip(_index: string, title: string): void {
  //   this.openValidationModal(_index, title);
  // }

  // private openValidationModal(_index: string, title: string): void {
  //   const dialogRef = this.dialog.open(ValidationModalComponent, {
  //     width: '100%',
  //     height: '100%',
  //     maxHeight: '20rem',
  //     maxWidth: '30rem',
  //     data: { title: title }
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     if(result === 'confirm'){
  //       this.cancellBook();
  //     }
  //   });
  // }


  public viewDetails(): void {
    const dialogRef = this.dialog.open(ViewtripsReservationModalComponent, {
      width:'100%',
      height:'100%',
      maxHeight:'57rem',
      maxWidth:'57rem',
      panelClass:'custom-viewdetrips-dialog',
      data: { }
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  
  private cancellBook(): void {
    const dialogRef = this.dialog.open(CancelReasonModalComponent,{
      panelClass:'custom-cancell-dialog',
      width:'100%',
      maxWidth:'45rem',
      data: { }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
    
  }


  private confirmRemoveTrip(_index: string): void {
    this.yourTrips = this.yourTrips.filter(item => item._id !== _index);
    this.filteredItems = [...this.yourTrips];
    this.originalItems = [...this.yourTrips];
  }



  public addNewItem(
    image: string,
    title: string,
    description: string,
    price_per_night: number,
    status: string,
    bookedDate:string,
    startdate: string,
    enddate:string,
    rating:any,
    reviews:any,
    address:any

  ): void {
    const newId = (this.yourTrips.length + 1).toString();
    // const today = new Date().toISOString().split('T')[0];
    this.yourTrips.push({ 
      _id: newId, 
      image:image,
      title:title, 
      description:description,
      price_per_night:price_per_night, 
      status:status,
      bookedDate:bookedDate, 
      startdate:startdate,
      enddate:enddate,
      rating:rating,
      reviews:reviews,
      address:address
    });
    this.filteredItems = [...this.yourTrips];
  }



 
}
