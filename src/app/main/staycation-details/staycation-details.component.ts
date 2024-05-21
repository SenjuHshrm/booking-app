import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { fadeInAnimation } from 'src/app/globals/fadein-animations';


@Component({
  selector: 'app-staycation-details',
  templateUrl: './staycation-details.component.html',
  styleUrls: ['./staycation-details.component.scss'],
  animations:[fadeInAnimation]
})

export class StaycationDetailsComponent {
  constructor(private router: Router) {}


  backToMain() {
    this.router.navigate(['main']);
  }

  gotoGalleryPage() {
    this.router.navigate(['main/gallery']);
  }


  
  navigateToBookStaycation() {
    this.router.navigate(['main/book-staycation']);
  }
  

  public listproperties = [
    {
      image: '/assets/images/main/staycation-list/images/1.jpg',
      title:'Condo, in Quezon City',
      description:'CHiLLAX1: PS4 Netflix Disney+ BoardGames DanceSing',
      permonth:'5,000'
    },
    {
      image: '/assets/images/main/staycation-list/images/2.webp',
      title:'Condo, in Quezon City',
      description:'CHiLLAX1: PS4 Netflix Disney+ BoardGames DanceSing',
      permonth:'5,000'
    },
    {
      image: '/assets/images/main/staycation-list/images/3.webp',
      title:'Condo, in Quezon City',
      description:'CHiLLAX1: PS4 Netflix Disney+ BoardGames DanceSing',
      permonth:'5,000'
    },
    {
      image: '/assets/images/main/staycation-list/images/4.jpg',
      title:'Condo, in Quezon City',
      description:'CHiLLAX1: PS4 Netflix Disney+ BoardGames DanceSing',
      permonth:'5,000'
    },
    {
      image: '/assets/images/main/staycation-list/images/5.webp',
      title:'Condo, in Quezon City',
      description:'CHiLLAX1: PS4 Netflix Disney+ BoardGames DanceSing',
      permonth:'5,000'
    },


 
  ];
}
