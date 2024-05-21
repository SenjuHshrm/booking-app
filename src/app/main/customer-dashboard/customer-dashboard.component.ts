import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { fadeInAnimation } from 'src/app/globals/fadein-animations';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.scss'],
  animations:[fadeInAnimation]
})
export class CustomerDashboardComponent {
 
  constructor(private router: Router) {}
  
  isActive: boolean = false;

  selectedTab: string = 'tab1';


  gotToHome() {
    this.router.navigate(['']);
  }

  gotoToday(tabName: string) {
    this.selectedTab = tabName;
    this.router.navigate(['main/dashboard/today']);
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
