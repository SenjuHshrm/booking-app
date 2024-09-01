import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { fadeInAnimation } from 'src/app/globals/fadein-animations';
import { ValidationModalComponent } from './validation-modal/validation-modal.component';
import { MatDialog } from '@angular/material/dialog';

interface DataItem {
  _id: string;
  image: string;
  title: string;
  description: string;
  permonth: number;
  status: string;
  date: string;
}

@Component({
  selector: 'app-your-trips',
  templateUrl: './your-trips.component.html',
  styleUrls: ['./your-trips.component.scss'],
  animations: [fadeInAnimation]
})
export class YourTripsComponent implements OnInit {

  filteredItems: DataItem[] = [];
  notFound: boolean = false;
  public searchInputs: string = '';
  filter_cat:string = '';

  public yourTrips: DataItem[] = [
    { _id: '0', image: '../assets/images/main/staycation-details/gallery1.png', title: 'Our house in tagaytay', description: 'Our condo', permonth: 1200, status: 'Upcoming Trips', date: '2024-06-30' },
    { _id: '1', image: '../assets/images/main/staycation-details/gallery2.png', title: 'Our building in baguio', description: 'Our condo', permonth: 1200, status: 'Pending', date: '2024-09-30' },
    { _id: '2', image: '../assets/images/main/staycation-details/gallery5.png', title: 'Our office in Manila', description: 'Our condo', permonth: 1200, status: 'Upcoming Trips', date: '2024-11-30' },
    { _id: '3', image: '../assets/images/main/staycation-details/gallery3.png', title: 'Our office in Manila', description: 'Our condo', permonth: 1200, status: 'Upcoming Trips', date: '2024-11-30' },
    { _id: '4', image: '../assets/images/main/staycation-details/gallery2.png', title: 'Our office in Manila', description: 'Our condo', permonth: 1200, status: 'Disapproved', date: '2024-11-30' },
    { _id: '5', image: '../assets/images/main/staycation-details/gallery3.png', title: 'Our office in Manila', description: 'Our condo', permonth: 1200, status: 'Past Trips', date: '2024-11-30' },
    { _id: '6', image: '../assets/images/main/staycation-details/gallery3.png', title: 'Our building in baguio', description: 'Our condo', permonth: 1200, status: 'Upcoming Trips', date: '2024-11-30' },
    { _id: '7', image: '../assets/images/main/staycation-details/gallery3.png', title: 'Our office in Manila', description: 'Our condo', permonth: 1200, status: 'Disapproved', date: '2024-11-30' },
    { _id: '8', image: '../assets/images/main/staycation-details/gallery2.png', title: 'Our office in Manila', description: 'Our condo', permonth: 1200, status: 'Upcoming Trips', date: '2024-11-30' },
    { _id: '9', image: '../assets/images/main/staycation-details/gallery3.png', title: 'Our building in baguio', description: 'Our condo', permonth: 1200, status: 'Upcoming Trips', date: '2024-11-30' },
    { _id: '10', image: '../assets/images/main/staycation-details/gallery5.png', title: 'Our office in Manila', description: 'Our condo', permonth: 1200, status: 'Past Trips', date: '2024-11-30' },
    { _id: '11', image: '../assets/images/main/staycation-details/gallery3.png', title: 'Our office in Manila', description: 'Our condo', permonth: 1200, status: 'Upcoming Trips', date: '2024-11-30' },
    { _id: '12', image: '../assets/images/main/staycation-details/gallery3.png', title: 'Our office in Manila', description: 'Our condo', permonth: 1200, status: 'Upcoming Trips', date: '2024-11-30' },
    { _id: '13', image: '../assets/images/main/staycation-details/gallery4.png', title: 'Our house in tagaytay', description: 'Our condo', permonth: 1200, status: 'Disapproved', date: '2024-11-30' },
    { _id: '14', image: '../assets/images/main/staycation-details/gallery5.png', title: 'Our house in tagaytay', description: 'Our condo', permonth: 1200, status: 'Upcoming Trips', date: '2024-10-30' },
    { _id: '15', image: '../assets/images/main/staycation-details/gallery5.png', title: 'Our house in tagaytay', description: 'Our condo', permonth: 1200, status: 'Past Trips', date: '2024-11-30' },
  ];

  originalItems: DataItem[] = [...this.yourTrips];

  constructor(private router: Router, public dialog: MatDialog) {
  
  }

  ngOnInit(): void {

    this.filteredItems = this.yourTrips;
    this.notFound = this.filteredItems.length === 0;
  }

  filterItems(query: string): void {
    if (query) {
      const lowerCaseQuery = query.toLowerCase();
      this.filteredItems = this.yourTrips.filter((item: DataItem) =>
        item.title.toLowerCase().includes(lowerCaseQuery) ||
        item.description.toLowerCase().includes(lowerCaseQuery) ||
        item.status.toLowerCase().includes(lowerCaseQuery) ||
        item.permonth.toString().includes(query) ||
        item.title.includes(query) || 
        item.description.includes(query) ||
        item.status.includes(query) 
      );
  
      this.filter_cat = query;
    } else {
      this.filteredItems = [...this.yourTrips];
      this.originalItems = [...this.filteredItems];
      this.notFound = this.filteredItems.length === 0;
    }
  }

  navigateToBookStaycation(id: string): void {
    this.router.navigate(['main/staycation-details', id]);
    console.log("Click");
  }

  public goToSearchList(): void {
    this.router.navigate(['main/staycation-list']);
  }

  public removeTrip(_index:any,title:string): void {
    this.openValidationModal(_index,title);
  }

  private openValidationModal(_index:any,title:string): void {
    const dialogRef = this.dialog.open(ValidationModalComponent, {
      width: '100%',
      height: '100%',
      maxHeight: '20rem',
      maxWidth: '30rem',
      data:{
        title:title
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.confirmRemoveTrip(_index);
      }
    });
  }

  private confirmRemoveTrip(_index: any): void {
    this.yourTrips = this.yourTrips.filter(item => item._id !== _index);
    this.filteredItems = [...this.yourTrips];
    this.notFound = this.filteredItems.length === 0;
    console.log(this.yourTrips);
  }
  
  get categorizedData() {
    const groupedData = this.filteredItems.reduce((acc: { [key: string]: DataItem[] }, item: DataItem) => {
      const date = item.date;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(item);
      return acc;
    }, {} as { [key: string]: DataItem[] });
    return groupedData;
  }

  sortByDate = (a: { key: string }, b: { key: string }) => {
    return new Date(b.key).getTime() - new Date(a.key).getTime();
  };

  // Call this method to add new items
  addNewItem(
    image: any,
    title: string,
    description: string,
    permonth: number,
    status: string,
    date: string,
  ): void {
    const today = new Date().toISOString().split('T')[0]; // Format as YYYY-MM-DD
    this.yourTrips.push({ _id: (this.yourTrips.length + 1).toString(), image:image, title, description, permonth: permonth, status: status, date: date });
    console.log(today);
  }
}
