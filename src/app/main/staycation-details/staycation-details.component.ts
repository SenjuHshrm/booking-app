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

  // @Input() public isAuth: boolean = false


 
  public gallery: string[] = [];
  public details: any;
  public amenitiesData:any;
  public serviceCharge: any = [];
  private _sub: Subscription = new Subscription()
  public imageSets: any;
  public imgS: number = 0;
  public totalBeforeTax!: number;
  public averageStar: number = 0;
  public totalReviews: number = 0;
  public latestReview: any;

  public guest_adults: number = 0;
  public guest_children: number = 0;
  public guest_infants: number = 0;
  public guest_pets: number = 0;

  public wishlistIcons: boolean = false;

  public fullText: string = 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magnam ullam reiciendis iste iure repellat ipsa, quis laborum dolore et? Esse recusandae molestiae voluptates assumenda saepe veniam commodi vero quo earum.                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magnam ullam reiciendis iste iure repellat ipsa, quis laborum dolore et? Esse recusandae molestiae voluptates assumenda saepe veniam commodi vero quo earum.                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magnam ullam reiciendis iste iure repellat ipsa, quis laborum dolore et? Esse recusandae molestiae voluptates assumenda saepe veniam commodi vero quo earum.                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magnam ullam reiciendis iste iure repellat ipsa, quis laborum dolore et? Esse recusandae molestiae voluptates assumenda saepe veniam commodi vero quo earum.                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magnam ullam reiciendis iste iure repellat ipsa, quis laborum dolore et? Esse recusandae molestiae voluptates assumenda saepe veniam commodi vero quo earum.                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magnam ullam reiciendis iste iure repellat ipsa, quis laborum dolore et? Esse recusandae molestiae voluptates assumenda saepe veniam commodi vero quo earum.';
  public isExpanded: boolean = false;


  public ambiance: any = [
    { label: 'Peaceful' },
    { label: 'Unique' },
    { label: 'Stylish' },
    { label: 'Family-friendly' },
    { label: 'Spacious' }
  ]

  public discountedOffer: any = [
    { discount: 0, description: 'No discount is available at this time.', selected: false },
    { discount: 20, description: 'Offer discounts for first 3 bookings.', selected: true },
    { discount: 30, description: 'For stays of 7 nights or more.', selected: false },
    { discount: 50, description: 'For stays of 28 nights or more.', selected: false },
  ]

  whereYouSleep: any = [
    { images: '../assets/images/main/staycation-details/gallery1.png', label: 'Bedroom 1', description: '1 double bed, 1 single bed' },
    { images: '../assets/images/main/staycation-details/gallery2.png', label: 'Bedroom 2', description: '1 double bed, 1 single bed' },
    { images: '../assets/images/main/staycation-details/gallery3.png', label: 'Bedroom 3', description: '1 double bed, 1 single bed' },
    { images: '../assets/images/main/staycation-details/gallery4.png', label: 'Bedroom 4', description: '1 double bed, 1 single bed' },
    { images: '../assets/images/main/staycation-details/gallery5.png', label: 'Bedroom 5', description: '1 double bed, 1 single bed' },
  ]


  constructor(
    private router: Router,
    private _activatedRoute: ActivatedRoute,
    private _staycation: StaycationService,
    private _basicUtil: BasicUtilService,
    private _globalStatic: GlobalStaticService,
    public dialog: MatDialog,
    
  ) {

  }


  ngOnInit(): void {
    this.amenitiesData = this._activatedRoute.paramMap.subscribe({
      next: (v: ParamMap) => {
        this._getStaycationDetails(<string>v.get('id'))
      }
    })
    this._getGlobalStaticFee();
  }

  ngOnDestroy(): void {

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

  public viewImageBedroom(img:any):void  {
    this.dialog.open(WheretoSleepViewComponent, {
      width: '100%',
      height:'100%',
      maxWidth:'100%',
      maxHeight:'100%',
      data: { bedImages:this.whereYouSleep[img]}
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
    this.wishlistIcons = !this.wishlistIcons;
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
    this.router.navigate(['main/book-staycation']);
  }

  public getTotalBeforeTax(total: number) {
    return this._basicUtil.getTotalBeforeTax(total, this.serviceCharge)
  }

  private _getStaycationDetails(id: string) {
    this._sub.add(this._staycation.getStaycationDetails(id).subscribe({
      next: (res: any) => {
        console.log(res)
        this.details = {
          ...res,
          amenities: res.amenities.join(", "),
          address: this._basicUtil.constructAddress(res.address),
          host: {
            name: this._basicUtil.constructName(res.host.name),
            img: this._basicUtil.setImgUrl(res.host.img)
          },

        }
        this._pushMedia(res.media)
      }
    }))


   
  }

 
  private _getGlobalStaticFee() {
    this._sub.add(this._globalStatic.getStaticByType('service_fee').subscribe({
      next: (res: any) => {
        console.log(res)
        res.data.forEach((r: any) => {
          // this.serviceCharge.push(r)
          Object.keys(r).forEach((key: string) => {
            this.serviceCharge.push({
              name: this._basicUtil.propToReadable(key),
              price: r[key]
            })
          })
        })
      }
    }))
  }


  private _pushMedia(img: { cover: string, imgs: string[] }) {
    this.gallery.push(this._basicUtil.setImgUrl(img.cover))
    img.imgs.forEach((i: string) => {
      this.gallery.push(this._basicUtil.setImgUrl(i))
    })

    this.imageSets = limit(this.gallery, 5);
    console.log(this.imageSets)
  }









}
