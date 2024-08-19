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
 
  constructor(
    private router: Router
  ) {
    this.selectedTab = this.last_Url = this.router.url.split('/')[3];
  }
  
  isActive: boolean = false;

  last_Url: any;
  selectedTab: any;


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
