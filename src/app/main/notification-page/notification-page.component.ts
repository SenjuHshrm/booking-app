import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { fadeInAnimation } from 'src/app/globals/fadein-animations';

@Component({
  selector: 'app-notification-page',
  templateUrl: './notification-page.component.html',
  styleUrls: ['./notification-page.component.scss'],
  animations: [fadeInAnimation]
})
export class NotificationPageComponent {
   constructor( private location: Location,){

   }
  avatar:any =[{},{},{},{},{},{},{},{},{},{},{},]

  goBack() {
    this.location.back();
  }
  
}
