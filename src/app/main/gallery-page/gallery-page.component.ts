import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { fadeInAnimation } from 'src/app/globals/fadein-animations';

interface Item{
  imageSrc:string,
  imageAlt:string
}

@Component({
  selector: 'app-gallery-page',
  templateUrl: './gallery-page.component.html',
  styleUrls: ['./gallery-page.component.scss'],
  animations:[fadeInAnimation]
})
export class GalleryPageComponent  {
  
  constructor(private router: Router) {}

  title = "gallery";
  data: Item[] = [
    {
      imageSrc: '../../assets/images/main/staycation-list/images/1.jpg',      
      imageAlt: '1'
    },
    {
      imageSrc: '../../assets/images/main/staycation-list/images/2.webp',      
      imageAlt: '1'
    },
    {
      imageSrc: '../../assets/images/main/staycation-list/images/3.webp',      
      imageAlt: '1'
    },
    {
      imageSrc: '../../assets/images/main/staycation-list/images/4.jpg',      
      imageAlt: '1'
    },
    {
      imageSrc: '../../assets/images/main/staycation-list/images/5.webp',      
      imageAlt: '1'
    },
    {
      imageSrc: '../../assets/images/main/staycation-list/images/6.webp',      
      imageAlt: '1'
    },
    {
      imageSrc: '../../assets/images/main/staycation-list/images/7.webp',      
      imageAlt: '1'
    },
    {
      imageSrc: '../../assets/images/main/staycation-list/images/8.webp',      
      imageAlt: '1'
    },
    {
      imageSrc: '../../assets/images/main/staycation-list/images/9.webp',      
      imageAlt: '1'
    },
    {
      imageSrc: '../../assets/images/main/staycation-list/images/10.webp',      
      imageAlt: '1'
    },
    {
      imageSrc: '../../assets/images/main/staycation-list/images/11.jpg',      
      imageAlt: '1'
    },
    {
      imageSrc: '../../assets/images/main/staycation-list/images/12.webp',      
      imageAlt: '1'
    },
    {
      imageSrc: '../../assets/images/main/staycation-list/images/13.webp',      
      imageAlt: '1'
    },
    {
      imageSrc: '../../assets/images/main/staycation-list/images/14.webp',      
      imageAlt: '1'
    },
    {
      imageSrc: '../../assets/images/main/staycation-list/images/15.webp',      
      imageAlt: '1'
    },
    
  
  ]

  backToBookingDetails() {
    this.router.navigate(['main/staycation-details']);
  }

  
}
