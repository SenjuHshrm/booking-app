import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-staycation-list',
  templateUrl: './staycation-list.component.html',
  styleUrls: ['./staycation-list.component.scss']
})
export class StaycationListComponent {
  constructor(private router: Router) {}
  
  navigateToBookStaycation() {
    this.router.navigate(['main/staycation-details']);
    console.log("Click");
  }

  navigateToHome() {
    this.router.navigate(['']);
    console.log("Click");
  }

  public listproperties = [
    {
      image: '/assets/images/main/staycation-list/image 0.png',
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
    },
    {
      image: '/assets/images/main/staycation-list/image 4.png',
      title:'Condo, in Quezon City',
      description:'CHiLLAX1: PS4 Netflix Disney+ BoardGames DanceSing',
      permonth:'5,000'
    },
    {
      image: '/assets/images/main/staycation-list/image 5.png',
      title:'Condo, in Quezon City',
      description:'CHiLLAX1: PS4 Netflix Disney+ BoardGames DanceSing',
      permonth:'5,000'
    },
    {
      image: '/assets/images/main/staycation-list/image 6.png',
      title:'Condo, in Quezon City',
      description:'CHiLLAX1: PS4 Netflix Disney+ BoardGames DanceSing',
      permonth:'5,000'
    },
    {
      image: '/assets/images/main/staycation-list/image 7.png',
      title:'Condo, in Quezon City',
      description:'CHiLLAX1: PS4 Netflix Disney+ BoardGames DanceSing',
      permonth:'5,000'
    },
    {
      image: '/assets/images/main/staycation-list/image 8.png',
      title:'Condo, in Quezon City',
      description:'CHiLLAX1: PS4 Netflix Disney+ BoardGames DanceSing',
      permonth:'5,000'
    },
    {
      image: '/assets/images/main/staycation-list/image 9.png',
      title:'Condo, in Quezon City',
      description:'CHiLLAX1: PS4 Netflix Disney+ BoardGames DanceSing',
      permonth:'5,000'
    },
    {
      image: '/assets/images/main/staycation-list/image 10.png',
      title:'Condo, in Quezon City',
      description:'CHiLLAX1: PS4 Netflix Disney+ BoardGames DanceSing',
      permonth:'5,000'
    },
    {
      image: '/assets/images/main/staycation-list/image 11.png',
      title:'Condo, in Quezon City',
      description:'CHiLLAX1: PS4 Netflix Disney+ BoardGames DanceSing',
      permonth:'5,000'
    },
    {
      image: '/assets/images/main/staycation-list/image 12.png',
      title:'Condo, in Quezon City',
      description:'CHiLLAX1: PS4 Netflix Disney+ BoardGames DanceSing',
      permonth:'5,000'
    },
    {
      image: '/assets/images/main/staycation-list/image 13.png',
      title:'Condo, in Quezon City',
      description:'CHiLLAX1: PS4 Netflix Disney+ BoardGames DanceSing',
      permonth:'5,000'
    },
    {
      image: '/assets/images/main/staycation-list/image 14.png',
      title:'Condo, in Quezon City',
      description:'CHiLLAX1: PS4 Netflix Disney+ BoardGames DanceSing',
      permonth:'5,000'
    },

 
  ];
}
