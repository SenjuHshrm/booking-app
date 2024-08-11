import { GlobalStaticService } from './../../services/global-static.service';
import { BasicUtilService } from './../../services/basic-util.service';
import { StaycationService } from './../../services/staycation.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { fadeInAnimation } from 'src/app/globals/fadein-animations';
import { limit } from './limit'; // Adjust the path as necessary
import { MatDialog } from '@angular/material/dialog';
import { MessageProprietorComponent } from 'src/app/globals/message-proprietor/message-proprietor.component';

@Component({
  selector: 'app-staycation-details',
  templateUrl: './staycation-details.component.html',
  styleUrls: ['./staycation-details.component.scss'],
  animations: [fadeInAnimation]
})

export class StaycationDetailsComponent implements OnInit, OnDestroy {

  public gallery: string[] = [];
  public details: any;
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


  public ambiance:any = [
    {label:'Peaceful'},
    {label:'Unique'},
    {label:'Stylish'},
    {label:'Family-friendly'},
    {label:'Spacious'}
  ]

  public discountedOffer:any=[
    {discount:0, description:'No discount is available at this time.', selected:false},
    {discount:20, description:'Offer discounts for first 3 bookings.', selected:true},
    {discount:30, description:'For stays of 7 nights or more.', selected:false},
    {discount:50, description:'For stays of 28 nights or more.', selected:false},
  ]

  constructor(
    private router: Router,
    private _activatedRoute: ActivatedRoute,
    private _staycation: StaycationService,
    private _basicUtil: BasicUtilService,
    private _globalStatic: GlobalStaticService,
    public dialog: MatDialog

  ) {

  }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe({
      next: (v: ParamMap) => {
        this._getStaycationDetails(<string>v.get('id'))
      }
    })
    this._getGlobalStaticFee();
  }

  ngOnDestroy(): void {
  
  }


messageProprietor(): void {
  this.dialog.open(MessageProprietorComponent, {
    width: '100%',
    maxWidth:'35rem',
    height:'100%',
    maxHeight:'25rem',
    data: {img:this.details.host}
  });
}

  
  wishListToggle(){
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
          }
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
