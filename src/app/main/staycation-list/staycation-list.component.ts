import { Component, ViewChild, ViewEncapsulation, OnInit } from '@angular/core';
import SwiperCore, { Navigation, Scrollbar, A11y, Autoplay } from 'swiper';
import { SwiperComponent } from 'swiper/angular';
import { BasicUtilService } from './../../services/basic-util.service';
import { Subscription } from 'rxjs';
import { StaycationService } from './../../services/staycation.service';
import { OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { StaycationlistLocationModalComponent } from './component/staycationlist-location-modal/staycationlist-location-modal.component';
import { StaycationlistAddguestModalComponent } from './component/staycationlist-addguest-modal/staycationlist-addguest-modal.component';
import { fadeInAnimation } from 'src/app/globals/fadein-animations';


SwiperCore.use([Autoplay]);
SwiperCore.use([Navigation, Scrollbar, A11y]);

@Component({
  selector: 'app-staycation-list',
  templateUrl: './staycation-list.component.html',
  styleUrls: ['./staycation-list.component.scss'],
  animations: [fadeInAnimation],
  encapsulation: ViewEncapsulation.None,
})
export class StaycationListComponent implements OnInit, OnDestroy  {
  @ViewChild('swiper', { static: false }) swiper?: SwiperComponent;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private _staycation: StaycationService,
    private _basicUtil: BasicUtilService
  ) { }

  private _sub: Subscription = new Subscription()
  public page: number = 1;
  public limit: number = 16;
  public total: number = 0
  public listproperties: any = [];

  public placeType: string = 'placeType=room';
  public description: string = ''

  public showCat: string = "staycation";
  currentTitle: string = '';



  ngOnInit(): void {
    this.searchStaycation(this.page, this.limit)
  }
 

  ngOnDestroy(): void {
    this._sub.unsubscribe()
  }

  handleShowCat(catData: any) {
    this.showCat = catData;
    this.currentTitle = '';
    // console.log(catData)
    this.description = ''
    switch(catData) {
      case "eventplace":
        this.placeType = 'placeType=event_place';
        break;
      case "staycation":
        this.placeType = 'placeType=room&placeType=room_shared'
    }
    this.searchStaycation(1, this.limit)
  }

  handleBtnCat(btnTitle: string) {
    this.currentTitle = btnTitle;
    this.description = `descriptionFilter=${btnTitle}`
    this.searchStaycation(1, this.limit)
  }

  showLocationModal(): void {
    const dialogRefLocation = this.dialog.open(StaycationlistLocationModalComponent, {
      panelClass: 'custom-location-modal'
    });

    dialogRefLocation.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }

  showAddGuestModal(): void {
    const dialogRefGuest = this.dialog.open(StaycationlistAddguestModalComponent, {
      panelClass: 'custom-guest-modal'
    });

    dialogRefGuest.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }


  navigateToBookStaycation(id: string) {
    this.router.navigate(['main/staycation-details', id]);
    console.log("Click");
  }

  navigateToHome() {
    this.router.navigate(['']);
    console.log("Click");
  }

  public searchStaycation(p: number, l: number) {
    let q: string = `listed=true&${this.placeType}&${this.description}`
    this.listproperties = []
    this._sub.add(this._staycation.getOfficialList(p, l, q).subscribe({
      next: (res: any) => {
        this.total = res.total
        res.listings.forEach((l: any) => {
          this.listproperties.push({
            _id: l._id,
            image: this._basicUtil.setImgUrl(l.media.cover),
            title: l.name,
            description: l.descriptionText.join(', '),
            permonth: `${l.price.common} (Before Tax: ${l.price.beforeTax})`
          })
        })
      }
    }))
  }


}
