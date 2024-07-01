import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-notification-page',
  templateUrl: './notification-page.component.html',
  styleUrls: ['./notification-page.component.scss']
})
export class NotificationPageComponent {
   constructor( private location: Location,){

   }
  avatar:any =[{},{},{},{},{},{},{},{},{},{},{},]

  goBack() {
    this.location.back();
  }
  
}
