import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y,Autoplay } from 'swiper';
import { SwiperComponent } from 'swiper/angular';
import { Router } from '@angular/router';
import { fadeInAnimation } from '../globals/fadein-animations';

SwiperCore.use([Autoplay]);
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations:[fadeInAnimation]
})
export class HomeComponent {
  constructor(private router: Router) {}

  @ViewChild('swiper', { static: false }) swiper?: SwiperComponent;
 
  selectedOption: any;
  panelOpenState = false;
 


  navigateToMain() {
    this.router.navigate(['main/staycation-list']);
    console.log("Click");
  }

heroImages:any=[
  {images:'../assets/images/home/header/hero/0.jpg'},
  {images:'../assets/images/home/header/hero/1.jpg'},
  {images:'../assets/images/home/header/hero/2.jpg'},
  {images:'../assets/images/home/header/hero/3.jpg'},
]

destinations:any = [
  {images:'../assets/images/home/section1/Manila.jpg',description:'Manila'},
  {images:'../assets/images/home/section1/Batangas.jpg',description:'Batangas'},
  {images:'../assets/images/home/section1/Boracay.jpg',description:'Boracay'},
  {images:'../assets/images/home/section1/Manila.jpg',description:'Manila'},
  {images:'../assets/images/home/section1/Batangas.jpg',description:'Batangas'},
  {images:'../assets/images/home/section1/Boracay.jpg',description:'Boracay'},
  {images:'../assets/images/home/section1/Manila.jpg',description:'Manila'},
  {images:'../assets/images/home/section1/Batangas.jpg',description:'Batangas'},
  {images:'../assets/images/home/section1/Boracay.jpg',description:'Boracay'},
]

types:any = [
  {images:'../assets/images/home/section1/Manila.jpg',description:'Resorts'},
  {images:'../assets/images/home/section1/Batangas.jpg',description:'Appartments'},
  {images:'../assets/images/home/section1/Boracay.jpg',description:'Villas'},
  {images:'../assets/images/home/section1/Manila.jpg',description:'Guest House'},
  {images:'../assets/images/home/section1/Batangas.jpg',description:'Condominium'},
  {images:'../assets/images/home/section1/Boracay.jpg',description:'Houses'},
  {images:'../assets/images/home/section1/Manila.jpg',description:'Camping'},
  {images:'../assets/images/home/section1/Batangas.jpg',description:'Tiny House'},
  {images:'../assets/images/home/section1/Boracay.jpg',description:'Containers'},
]



//Swiper
slideNext() {
  this.swiper?.swiperRef.slideNext(500);
}
slidePrev() {
  this.swiper?.swiperRef.slidePrev(500);
}
//Swiper

}
