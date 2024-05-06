import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.scss']
})
export class WishListComponent {

  constructor(private router: Router,private location: Location) {}

  navigateToBookStaycation() {
    this.router.navigate(['main/staycation-details']);
    console.log("Click");
  }
  
  goBack() {
    this.location.back();
  }
  
  public listproperties = [
    {
      image: '/assets/images/main/staycation-list/images/1.jpg',
      title:'Condo, in Quezon City',
      description:'CHiLLAX1: PS4 Netflix Disney+ BoardGames DanceSing',
      permonth:'5,000'
    },
    {
      image: '/assets/images/main/staycation-list/image 1.png',
      title:'Condo, in Quezon City',
      description:'CHiLLAX1: PS4 Netflix Disney+ BoardGames DanceSing',
      permonth:'5,000'
    },
    {
      image: '/assets/images/main/staycation-list/image 2.png',
      title:'Condo, in Quezon City',
      description:'CHiLLAX1: PS4 Netflix Disney+ BoardGames DanceSing',
      permonth:'5,000'
    },
    {
      image: '/assets/images/main/staycation-list/image 3.png',
      title:'Condo, in Quezon City',
      description:'CHiLLAX1: PS4 Netflix Disney+ BoardGames DanceSing',
      permonth:'5,000'
    }

 
  ];
}
