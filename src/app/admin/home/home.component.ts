import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { 
  this.selectedTab =  this.last_Url = this.router.url.split('/')[3];
  }

  isMinimizedSidebar = false;
  last_Url :any;
  selectedTab:any;


  ngOnInit(): void {
  }

  toggleSidebar() {
    this.isMinimizedSidebar = !this.isMinimizedSidebar;
  }



gotoPage(actives: string) {
  this.selectedTab = actives;
  this.router.navigate([`admin/home/${actives}`]);
}



}
