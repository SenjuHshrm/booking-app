import { BasicUtilService } from './../../services/basic-util.service';
import { GlobalStaticService } from './../../services/global-static.service';
import { environment } from './../../../environments/environment';
import { HttpErrorResponse } from '@angular/common/http';
import { ITokenClaims } from './../../interfaces/token';
import { TokenService } from './../../services/token.service';
import { UserService } from './../../services/user.service';
import { Subscription, forkJoin } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { fadeInAnimation } from 'src/app/globals/fadein-animations';

interface ListProperty {
  title: string;
  permonth: number;
}

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.scss'],
  animations: [fadeInAnimation]
})
export class WishListComponent implements OnInit, OnDestroy {

  public listproperties: any = [];
  filteredItems: any[] = [];
  notFound: boolean = false;
  public searchInputs: string = ''
  originalItems: any[] = [...this.listproperties];
  
  private _claims!: ITokenClaims
  private _sub: Subscription = new Subscription();

  constructor(
    private router: Router,
    private location: Location,
    private _user: UserService,
    private _token: TokenService,
    private _gs: GlobalStaticService,
    private _basicUtil: BasicUtilService
  ) {
 
  }

  ngOnInit(): void {
    this._claims = <ITokenClaims>this._token.decodedToken()
    // this._sub.add(this._user.getUserWishlist(this._claims.sub).subscribe({
    //   next: (res: any) => {
    //     res[0].staycation.forEach((st: any) => {
    //       this.listproperties.push({ ...st, cover: `${environment.api}${st.cover}` })
          
    //     })
    //   },
    //   error: ({ error }: HttpErrorResponse) => {
    //     console.log(error)
    //   }
    // }))
    let userWL$ = this._user.getUserWishlist(this._claims.sub)
    let taxes$ = this._gs.getStaticByType('service_fee')
    forkJoin([ userWL$, taxes$ ]).subscribe({
      next: ([userWL, taxes]) => {
        userWL[0].staycation.forEach((st: any) => {
          let stc = { ...st, cover: `${environment.api}${st.cover}` }
          let tax = this._basicUtil.taxTotal(stc.price, taxes.data)
          stc.price += tax
          this.listproperties.push(stc)
        }) 
      }
    })

    this.filteredItems = this.listproperties;
    console.log( this.listproperties);
  }

  ngOnDestroy(): void {
    this._sub.unsubscribe()
  }

  navigateToBookStaycation(id: string) {
    this.router.navigate(['main/staycation-details', id]);
    console.log("Click");
  }
  

  public goToSeacrhList() {
    this.router.navigate(['main/staycation-list']);
  }

  filterItems(query: any): void {
    if (query) {
      this.filteredItems = this.listproperties.filter((item:any) =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.permonth.toString().includes(query)
    );

        this.notFound = this.filteredItems.length === 0;

    } else{
      this.filteredItems = [...this.originalItems];
    }
}
  
}
