import { Component, ViewChild, ViewEncapsulation, OnInit } from '@angular/core';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y,Autoplay } from 'swiper';
import { SwiperComponent } from 'swiper/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { fadeInAnimation } from '../globals/fadein-animations';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../globals/login/login.component';

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
  constructor(
    public dialog: MatDialog,
    private router: Router, 
    private activatedRoute: ActivatedRoute) {}

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
    if(this.isAuth){
    this.router.navigate(['/', 'main', 'staycation-list']);
  }{
     this.openLoginDialog();
  }
  }

  private openLoginDialog(): void {
    const dialogRefLogin = this.dialog.open(LoginComponent, {
      panelClass: 'custom-login-modal'
    });

    dialogRefLogin.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
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
  {images:'../assets/images/home/section1/type/resorts.png',description:'Resort'},
  {images:'../assets/images/home/section1/type/villa.png',description:'Private Villa'},
  {images:'../assets/images/home/section1/type/condo.png',description:'Service Condominium'},
  {images:'../assets/images/home/section1/type/hotel.png',description:'Hotel'},
  {images:'../assets/images/home/section1/type/Hotel Ballroom.jpeg',description:'Hotel BallRoom'},
  {images:'../assets/images/home/section1/type/Restaurant Space.jpeg',description:'Restaurant Space'},
  {images:'../assets/images/home/section1/type/Pavillion.jpg',description:'Pavillion'},
  {images:'../assets/images/home/section1/type/Gymnasium.jpeg',description:'Gymnasium'},
  {images:'../assets/images/home/section1/type/Meeting Room.jpeg',description:'Meeting Room'},
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
