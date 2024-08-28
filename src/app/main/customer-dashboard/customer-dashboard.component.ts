import { Component, OnInit } from '@angular/core';
import { fadeInAnimation } from 'src/app/globals/fadein-animations';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.scss'],
  animations:[fadeInAnimation]
})
export class CustomerDashboardComponent implements OnInit {
 
  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {

 


  }
  instro:boolean = false;
  
  isActive: boolean = false;
  last_Url: any;
  selectedTab: any;
  activeIndex:number = 0;
  isReservationPath = false;

  items = [
    { image: '../assets/images/proprietor-registration/girl.png', text: 'Text 1' },
    { image: '../assets/images/proprietor-registration/girl.png', text: 'Text 2' },
    { image: '../assets/images/proprietor-registration/girl.png', text: 'Text 3' }
  ];

  

  ngOnInit(): void {
    this.startAnimation();
  }

 

  startAnimation(): void {
    setInterval(() => {
      this.activeIndex++;
      if (this.activeIndex >= this.items.length) {
        this.activeIndex = 0;  
      }
    }, 5000); 
  }


  gotToHome() {
    this.router.navigate(['']);
  }

  gotoToday(tabName: string) {
    this.selectedTab = tabName;
    this.router.navigate(['main/dashboard/reservation']);
   
  }

  gotoCalendar(tabName: string) {
    this.selectedTab = tabName;
    this.router.navigate(['main/dashboard/calendar']);
    
  }

  gotoListing(tabName: string) {
    this.selectedTab = tabName;
    this.router.navigate(['main/dashboard/listing']);
   
  }
  
  gotoInbox(tabName: string) {
    this.selectedTab = tabName;
    this.router.navigate(['main/dashboard/inbox']);
   
  }

  
  
  
}
