import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.scss']
})
export class CustomerDashboardComponent {
 
  constructor(private router: Router) {}
  
  isActive: boolean = false;


  gotToHome() {
    this.router.navigate(['']);
  }

  gotoToday() {
    this.router.navigate(['main/dashboard/today']);
  }

  gotoCalendar() {
    this.router.navigate(['main/dashboard/calendar']);
  }

  gotoListing() {
    this.router.navigate(['main/dashboard/listing']);
  }
  
  gotoInbox() {
    this.router.navigate(['main/dashboard/inbox']);
  }
  

  
  
  
}
