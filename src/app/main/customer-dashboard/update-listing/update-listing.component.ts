import { Component, ViewEncapsulation} from '@angular/core';
import { fadeInAnimation } from 'src/app/globals/fadein-animations';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y,Autoplay } from 'swiper';
import { Location } from '@angular/common';

SwiperCore.use([Autoplay]);
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

@Component({
  selector: 'app-update-listing',
  templateUrl: './update-listing.component.html',
  styleUrls: ['./update-listing.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations:[fadeInAnimation]
})
export class UpdateListingComponent {

  constructor(private location: Location) {}
  
  selectedTab:any = "tab1"
  isPanelOpen = false;


 //////panel tab open-close////
  selectTab(tab:any){
    this.selectedTab = tab;
  }
  togglePanel() {
    this.isPanelOpen = !this.isPanelOpen;
    console.log(this.isPanelOpen);
  }
  closePanel(){
    this.isPanelOpen = false;
  }
  //////////////////////////////
  
  goBack(): void {
    this.location.back();
  }

}
