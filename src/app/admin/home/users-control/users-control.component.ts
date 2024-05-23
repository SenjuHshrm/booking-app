import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-control',
  templateUrl: './users-control.component.html',
  styleUrls: ['./users-control.component.scss']
})
export class UsersControlComponent implements OnInit {

  constructor(private router: Router) { 
    this.selectedTab =  this.last_Url = this.router.url.split('/').pop();
    }
  isActive: boolean = false;
  last_Url :any;
  selectedTab:any;

  ngOnInit(): void {
  }


  gotoNavigatePage(tabName: any) {
    this.selectedTab = tabName;
    this.router.navigate([`admin/home/user-control/${tabName}`]);
    console.log(tabName)
  }

  
}
