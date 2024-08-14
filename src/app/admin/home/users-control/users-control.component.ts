import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-users-control',
  templateUrl: './users-control.component.html',
  styleUrls: ['./users-control.component.scss'],
})
export class UsersControlComponent implements OnInit {

  constructor(private router: Router) { 
    this.selectedTab =  this.last_Url = this.router.url.split('/').pop();
    }
 
  last_Url :any;
  selectedTab:any;
  btnNames:string = "Admin";

  optionsMenu:any = [
    {title:'Admin', selected:false},
    {title:'Guest', selected:false},
    {title:'Proprietor',selected:false},
  ]
  

  ngOnInit(): void {
  }





  gotoNavigatePage(btnName:string,tabName:string) {
    this.selectedTab = tabName;
    this.btnNames = btnName;
    this.router.navigate([`admin/home/user-control/${tabName}`]);
  }

  
}
