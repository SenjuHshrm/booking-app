import { Component, ViewChild, ViewEncapsulation, OnInit, Input, Output, EventEmitter } from '@angular/core';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y,Autoplay } from 'swiper';
import { SwiperComponent } from 'swiper/angular';

SwiperCore.use([Autoplay]);
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

@Component({
  selector: 'app-your-space',
  templateUrl: './your-space.component.html',
  styleUrls: ['./your-space.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class YourSpaceComponent {

  @ViewChild('swiper', { static: false }) swiper?: SwiperComponent;
  @Output() dataEmitter = new EventEmitter<any>();

  
types:any = [
  {images:'../assets/images/home/section1/type/resorts.png',description:'Resort'},
  {images:'../assets/images/home/section1/type/villa.png',description:'Private Villa'},
  {images:'../assets/images/home/section1/type/condo.png',description:'Service Condominium'},
  {images:'../assets/images/home/section1/type/hotel.png',description:'Hotel'},
  {images:'../assets/images/home/section1/type/hotel.png',description:'Hotel BallRoom'},
  {images:'../assets/images/home/section1/type/hotel.png',description:'Restaurant Space'},
  {images:'../assets/images/home/section1/type/hotel.png',description:'Pavillion'},
  {images:'../assets/images/home/section1/type/hotel.png',description:'Gymnasium'},
  {images:'../assets/images/home/section1/type/hotel.png',description:'Meeting Room'},
]

selectedTab: any = "tab1";
closeLeftPanel: boolean = false;

selectTab(tab:any) {
  this.selectedTab = tab;
  this.dataEmitter.emit({
    tab: this.selectedTab,
    sidePanel: this.closeLeftPanel,
  });
}

}
