import { Component, HostListener, OnInit } from '@angular/core';
import { fadeInAnimation } from 'src/app/globals/fadein-animations';
import { Router, ActivatedRoute } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

interface DataItem {
  _id: string;
  image: string;
  title: string;
  description: string;
  price_per_night: number;
  bookedDate: string,
  status: string;
  startdate: string;
  enddate: string;
  rating: any;
  reviews: any;
  address: any;
}


@Component({
  selector: 'app-your-trips',
  templateUrl: './your-trips.component.html',
  styleUrls: ['./your-trips.component.scss'],
  animations: [fadeInAnimation]
})
export class YourTripsComponent implements OnInit {
  showFiller = false;
  isMinimizedSidebar = false;
  selectedTab: string = 'pending-trip';

  windowWidth: number = window.innerWidth;


  public yourTrips: DataItem[] = [
    {
      _id: '0',
      image: '../assets/images/main/staycation-details/gallery1.png',
      title: 'Our house in Tagaytay',
      description: 'Our condo',
      price_per_night: 1200,
      bookedDate: '2021-9-1',
      startdate: '2024-10-30',
      enddate: '2024-11-30',
      rating: 5,
      reviews: 100,
      status: 'Upcoming Trips',
      address: 'San Pablo City. Laguna'
    }


  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private breakpointObserver: BreakpointObserver
  ) { }


  ngOnInit(): void {
    this.breakpointObserver
      .observe([Breakpoints.Handset])
      .subscribe((result) => {
        this.isMinimizedSidebar = result.matches;
      });
  }


  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.windowWidth = event.target.innerWidth;
  }

  isActive(tab: string): boolean {
    return this.router.url.includes(tab);
  }

  selectTab(tab: string): void {
    this.selectedTab = tab;
    this.router.navigate([tab], { relativeTo: this.route });
  }

  toggleSidebar() {
    if (this.windowWidth < 600) {
      this.isMinimizedSidebar = !this.isMinimizedSidebar;
    } else {
     
    }
  }


  public goToSearchList(): void {
    this.router.navigate(['main/staycation-list']);
  }

}
