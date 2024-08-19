import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { CancellationService } from './../../services/cancellation.service';
import { DiscountService } from './../../services/discount.service';
import { ITokenClaims } from './../../interfaces/token';
import { TokenService } from './../../services/token.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from './../../services/user.service';
import { GlobalStaticService } from './../../services/global-static.service';
import { BasicUtilService } from './../../services/basic-util.service';
import { StaycationService } from './../../services/staycation.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { fadeInAnimation } from 'src/app/globals/fadein-animations';
import { limit } from './limit'; // Adjust the path as necessary
import { MessageProprietorComponent } from 'src/app/globals/message-proprietor/message-proprietor.component';
import { ViewChild, ViewEncapsulation } from '@angular/core';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';
import { SwiperComponent } from 'swiper/angular';
import { WheretoSleepViewComponent } from 'src/app/globals/whereto-sleep-view/whereto-sleep-view.component';
import { MatDialog } from '@angular/material/dialog';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { CustomDatepickerHeader } from './custom-datepicker-header';
import * as moment from 'moment'



SwiperCore.use([Autoplay]);
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);


@Component({
  selector: 'app-staycation-details',
  templateUrl: './staycation-details.component.html',
  styleUrls: ['./staycation-details.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [fadeInAnimation]
})

export class StaycationDetailsComponent implements OnInit, OnDestroy {

  public gallery: string[] = [];
  public details: any;
  public amenitiesData:any;
  private _sub: Subscription = new Subscription()
  private _t!: ITokenClaims
  public imageSets: any;
  public imgS: number = 0;
  public averageStar: number = 0;
  public totalReviews: number = 0;
  public latestReview: any;

  public guest_adults: number = 1;
  public guest_children: number = 0;
  public guest_infants: number = 0;
  public guest_pets: number = 0;

  public wishlistIcons: boolean = false;
  public wishlistId!: string;

  public discount: any = {};
  public cancellation: any;

  public isExpanded: boolean = false;

  public basePrice: number = 0
  public baseServiceCharge: number = 0
  public nights: number = 1;
  public serviceCharge: number = 0;
  public totalBeforeTax: number = 0;

  public today = new Date()
  public month = this.today.getMonth()
  public year = this.today.getFullYear()
  public day = this.today.getDate()
  public minDate: any = new Date()
  public customDatepickerHeader = CustomDatepickerHeader

  public checkInCheckOut = new FormGroup({
    start: new FormControl(new Date(this.year, this.month, this.day)),
    end: new FormControl(new Date(this.year, this.month, this.day))
  })

  constructor(
    private router: Router,
    private _activatedRoute: ActivatedRoute,
    private _staycation: StaycationService,
    private _basicUtil: BasicUtilService,
    private _globalStatic: GlobalStaticService,
    private _user: UserService,
    private _token: TokenService,
    private _discount: DiscountService,
    private _cancellation: CancellationService,
    public dialog: MatDialog,
  ) {

  }

  ngOnInit(): void {
    this._t = <ITokenClaims>this._token.decodedToken()
    this.amenitiesData = this._activatedRoute.paramMap.subscribe({
      next: (v: ParamMap) => {
        this._getStaycationDetails(<string>v.get('id'))
      }
    })
    this._getGlobalStaticFee();
  }

  ngOnDestroy(): void {
    this._sub.unsubscribe()
  }

  @ViewChild('swiper', { static: false }) swiper?: SwiperComponent;

  //Swiper
  slideNext() {
    this.swiper?.swiperRef.slideNext(500);
  }
  slidePrev() {
    this.swiper?.swiperRef.slidePrev(500);
  }
  //Swiper

  seemoreText() {
    this.isExpanded = !this.isExpanded;
  }

  public handleDateChangeStart(e: MatDatepickerInputEvent<any, any>) {
    console.log(e)
  }

  public handleDateChangeEnd(e: MatDatepickerInputEvent<any, any>) {
    let { start, end } = this.checkInCheckOut.value
    let ci = moment(start)
    let co = moment(end)
    let diff = co.diff(ci, 'days')
    console.log(diff)
    this.nights = (!isNaN(diff)) ? diff : 1
    this._calculateTotal()
  }

  public viewImageBedroom(img: string): void  {
    this.dialog.open(WheretoSleepViewComponent, {
      width: '100%',
      height:'100%',
      maxWidth:'100%',
      maxHeight:'100%',
      data: img
    });
    
  }

  public messageProprietor(): void {
    this.dialog.open(MessageProprietorComponent, {
      width:'100%',
      height:'100%',
      maxWidth:'35rem',
      maxHeight:'35rem',
      data: { proprietorHost: this.details.host, usersProfile:'' }
    });

   
  }


  wishListToggle() {
    (this.wishlistIcons) ? this._removeFromWishlist() : this._addToWishlist()
  }


  getId(data: any) {
    this.imgS = data;
    return
  }


  backToMain() {
    this.router.navigate(['main']);
  }

  gotoGalleryPage(id: string) {
    this.router.navigate(['main/gallery', id]);
  }


  navigateToBookStaycation() {
    let guests = JSON.stringify({ adult: this.guest_adults, children: this.guest_children, infant: this.guest_infants, pets: this.guest_pets })
    this.router.navigate(['main/book-staycation'], { queryParams: { staycationId: this.details._id, guests, duration: JSON.stringify(this.checkInCheckOut.value) } });
  }

  private _getStaycationDetails(id: string) {
    this._sub.add(this._staycation.getStaycationDetails(id).subscribe({
      next: (res: any) => {
        this.details = {
          ...res,
          placeType: this._setPlaceType(res.placeType),
          amenities: res.amenities.join(", "),
          address: this._basicUtil.constructAddress(res.address),
          host: {
            name: this._basicUtil.constructName(res.host.name),
            img: this._basicUtil.setImgUrl(res.host.img),
            approvedAsProprietorOn: this._basicUtil.calculateUserDuration(res.host.approvedAsProprietorOn)
          },
          bedroomList: res.bedroomList.map((b: string) =>  this._basicUtil.setImgUrl(b))
        }
        this.basePrice = res.price
        this._getDiscountDesc(res.discounts)
        this._getCancellationPolicy(res.cancellationPolicy)
        this._checkWishlist(this._t.sub, this.details._id)
        this._pushMedia(res.genImgList, res.cover)
      }
    }))
  }
 
  private _getGlobalStaticFee() {
    this._sub.add(this._globalStatic.getStaticByType('service_fee').subscribe({
      next: (res: any) => {
        this.baseServiceCharge = this._basicUtil.taxTotal(this.basePrice, res.data)
        this.serviceCharge = this.baseServiceCharge * this.nights
        this.totalBeforeTax = this.basePrice + this.serviceCharge
      }
    }))
  }

  private _pushMedia(genImgList: string[], cover: string) {
    let c = this._basicUtil.setImgUrl(cover)
    let gi = genImgList.map((g: string) => this._basicUtil.setImgUrl(g))
    this.gallery.push(this._basicUtil.setImgUrl(cover))
    gi.forEach((i: string) => {
      if(i !== c) {
        this.gallery.push(i)
      }
    })
    this.imageSets = limit(this.gallery, 5);
  }

  private _addToWishlist() {
    this._sub.add(this._user.addToWishlist(this._t.sub, this.details._id).subscribe({
      next: (res: any) => {
        this.wishlistIcons = true
      }
    }))
  }

  private _removeFromWishlist() {
    this._sub.add(this._user.removeToWishlist(this._t.sub, this.details._id).subscribe({
      next: (res: any) => {
        this.wishlistIcons = false
      }
    }))
  }

  private _checkWishlist(user: string, staycation: string) {
    this._sub.add(this._user.checkInWishlist(user, staycation).subscribe({
      next: (res: any) => {
        this.wishlistIcons = true
      },
      error: ({ error }: HttpErrorResponse) => {
        if(error.code === 'not-found') {
          this.wishlistIcons = false
        }
      }
    }))
  }

  private _setPlaceType(placeType: string): string {
    let res: string = ''
    switch(placeType) {
      case 'room':
        res = 'Room';
        break;
      case 'room_shared':
        res = 'Shared Room';
        break;
      default:
        res = 'Entire Place'
    }
    return res
  }

  private _getDiscountDesc(ds: any) {
    let { discounts } = this._discount
    let i = discounts.findIndex((d: any) => d.value === ds.discounts)
    this.discount = discounts[i]
  }

  private _getCancellationPolicy(cp: any) {
    let { cancellationPolicies } = this._cancellation
    let i = cancellationPolicies.findIndex((c: any) => c.value === cp.cancellationPolicy)
    this.cancellation = cancellationPolicies[i]
  }

  private _calculateTotal() {
    this.basePrice = this.details.price * this.nights
    this.serviceCharge = this.baseServiceCharge * this.nights
    this.totalBeforeTax = this.serviceCharge + this.basePrice
  }
}
