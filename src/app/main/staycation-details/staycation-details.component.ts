import { GlobalStaticService } from './../../services/global-static.service';
import { BasicUtilService } from './../../services/basic-util.service';
import { StaycationService } from './../../services/staycation.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { fadeInAnimation } from 'src/app/globals/fadein-animations';
import { limit } from './limit'; // Adjust the path as necessary

@Component({
  selector: 'app-staycation-details',
  templateUrl: './staycation-details.component.html',
  styleUrls: ['./staycation-details.component.scss'],
  animations:[fadeInAnimation]
})

export class StaycationDetailsComponent implements OnInit, OnDestroy {

  public gallery: string[] = []
  public details: any
  public serviceCharge: any = []
  private _sub: Subscription = new Subscription()
  public imageSets:any;
  public totalBeforeTax!: number;
  public averageStar: number = 0;
  public totalReviews: number = 0;
  public latestReview: any;
  
  constructor(
    private router: Router,
    private _activatedRoute: ActivatedRoute,
    private _staycation: StaycationService,
    private _basicUtil: BasicUtilService,
    private _globalStatic: GlobalStaticService
  ) {
    
  }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe({
      next: (v: ParamMap) => {
        this._getStaycationDetails(<string>v.get('id'))
      }
    })
    this._getGlobalStaticFee()
  }

  ngOnDestroy(): void {
    
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
  }
  


 
}
