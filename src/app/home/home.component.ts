import { Component, ViewChild, ViewEncapsulation, OnInit } from '@angular/core';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y,Autoplay } from 'swiper';
import { SwiperComponent } from 'swiper/angular';
import { Router, ActivatedRoute } from '@angular/router';
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
export class HomeComponent implements OnInit {
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  @ViewChild('swiper', { static: false }) swiper?: SwiperComponent;
 
  selectedOption: any;
  panelOpenState = false;
  public isAuth!: boolean;
  selectedValue: string = '';

  ngOnInit() {
    this.activatedRoute.data.subscribe({
      next: (res: any) => {
        this.isAuth = res.isAuth
      }
    })
  }

  navigateToMain() {
    this.router.navigate(['/', 'main', 'staycation-list']);
  }

  onRadioChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.selectedValue = inputElement.value;
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

staycationguide:any = [
  {title:'  One-to-one guidance from a Proprietor',description:'We’ll match you with a property owner in your area, who’ll guide you from your first question to your first guest—by phone, video call, or chat.'},
  {title:'  One-to-one guidance from a Proprietor',description:'We’ll match you with a property owner in your area, who’ll guide you from your first question to your first guest—by phone, video call, or chat.'},
  {title:'  One-to-one guidance from a Proprietor',description:'We’ll match you with a property owner in your area, who’ll guide you from your first question to your first guest—by phone, video call, or chat.'}
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

options = [
  { label: 'Entire Space', value: '1' },
  { label: 'Private Room', value: '2' },
];




//Swiper
slideNext() {
  this.swiper?.swiperRef.slideNext(500);
}
slidePrev() {
  this.swiper?.swiperRef.slidePrev(500);
}
//Swiper

}
