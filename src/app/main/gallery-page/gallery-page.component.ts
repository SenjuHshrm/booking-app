import { Subscription } from 'rxjs';
import { BasicUtilService } from './../../services/basic-util.service';
import { StaycationService } from './../../services/staycation.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { fadeInAnimation } from 'src/app/globals/fadein-animations';

interface Item{
  imageSrc:string,
  imageAlt:string
}

@Component({
  selector: 'app-gallery-page',
  templateUrl: './gallery-page.component.html',
  styleUrls: ['./gallery-page.component.scss'],
  animations:[fadeInAnimation]
})
export class GalleryPageComponent implements OnInit, OnDestroy {

  public id!: string;
  public details: any

  private _sub: Subscription = new Subscription()
  
  constructor(
    private router: Router,
    private _activatedRoute: ActivatedRoute,
    private _staycation: StaycationService,
    private _basicUtil: BasicUtilService
  ) {}

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe({
      next: (v: ParamMap) => {
        this.id = <string>v.get('id')
        this._getDetails(this.id)
      }
    })
  }

  ngOnDestroy(): void {
    this._sub.unsubscribe()
  }

  title = "gallery";
  data: Item[] = []

  backToBookingDetails(id: string) {
    this.router.navigate(['main/staycation-details', id]);
  }

  private _getDetails(id: string) {
    this._sub.add(this._staycation.getStaycationDetails(id).subscribe({
      next: (res: any) => {
        this.details = { ...res }
        this._setGallery(res.genImgList, res.cover)
      }
    }))
  }

  private _setGallery(genImgList: string[], cover: string) {
    // this.data.push({ imageSrc: this._basicUtil.setImgUrl(cover), imageAlt: 'img-cover' })
    // let i: number = 1
    // genImgList.forEach((img: string) => {
    //   this.data.push({
    //     imageSrc: this._basicUtil.setImgUrl(img),
    //     imageAlt: `img-${i}`
    //   })
    //   i++
    // })
    let c = this._basicUtil.setImgUrl(cover)
    let gi = genImgList.map((g: string) => this._basicUtil.setImgUrl(g))
    this.data.push({ imageSrc: c, imageAlt: 'img-cover' })
    let i = 0
    gi.forEach((g: string) => {
      if(g !== c) {
        this.data.push({ imageSrc: g, imageAlt: `img-${i}` })
        i++
      }
    })
  }

  
}
