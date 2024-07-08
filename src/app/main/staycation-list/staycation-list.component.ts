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
  private _sub: Subscription = new Subscription()
  public page: number = 1;
  public limit: number = 16;
  public total: number = 0
  public listproperties: any = [];
  public currentDate: string = new Date().toISOString().split("T")[0]
  public placeType: string = 'placeType=room';
  public description: string = ''
  public location: string = ''
  public startDate: string = '';
  public endDate: string = '';
  public guests: string = '';
  public showCat: string = "staycation";
  currentTitle: string = '';

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private _staycation: StaycationService,
    private _basicUtil: BasicUtilService
  ) { }

  ngOnInit(): void {
    this.searchStaycation(this.page, this.limit)
  }
 

  ngOnDestroy(): void {
    this._sub.unsubscribe()
  }

  handleShowCat(catData: any) {
    this.showCat = catData;
    this.currentTitle = '';
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

    dialogRefLocation.afterClosed().subscribe((res: string) => {
      this.location = res
    });
  }

  showAddGuestModal(): void {
    const dialogRefGuest = this.dialog.open(StaycationlistAddguestModalComponent, {
      panelClass: 'custom-guest-modal'
    });

    dialogRefGuest.afterClosed().subscribe((res: any) => {
      let obj: any = {};
      Object.keys(res).forEach((key: string) => {
        if(res[key] > 0) {
          obj[key] = res[key]
        }
      })
      this.guests = JSON.stringify(obj) === '{}' ? '' : JSON.stringify(obj);
    });
  }


  navigateToBookStaycation(id: string) {
    this.router.navigate(['main/staycation-details', id]);
  }

  navigateToHome() {
    this.router.navigate(['']);
  }

  public searchStaycation(p: number, l: number) {
    let q: string = `listed=true&${this.placeType}&${this.description}&${this._setSubFilters()}`
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

  private _setSubFilters(): string {
    let subFilters: any= [
      {
        cat: 'location',
        val: this.location
      },
      {
        cat: 'startDate',
        val: this.startDate
      },
      {
        cat: 'endDate',
        val: this.endDate
      },
      {
        cat: 'guests',
        val: this.guests
      }
    ]
    let str: string = ''
    subFilters.forEach((filter: any) => {
      if(filter.val !== '') {
        str += `${filter.cat}=${filter.val}&`
      }
    })
    return str;
  }


}
