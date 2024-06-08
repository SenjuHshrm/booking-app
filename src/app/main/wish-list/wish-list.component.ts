import { HttpErrorResponse } from '@angular/common/http';
import { ITokenClaims } from './../../interfaces/token';
import { TokenService } from './../../services/token.service';
import { UserService } from './../../services/user.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.scss']
})
export class WishListComponent implements OnInit, OnDestroy {

  public listproperties: any = [];
  
  private _claims!: ITokenClaims
  private _sub: Subscription = new Subscription();

  constructor(
    private router: Router,
    private location: Location,
    private _user: UserService,
    private _token: TokenService
  ) {}

  ngOnInit(): void {
    this._claims = this._token.decodedToken()
    this._sub.add(this._user.getUserWishlist(this._claims.sub).subscribe({
      next: (res: any) => {
        res.forEach((st: any) => {
          this.listproperties.push(st)
        })
      },
      error: ({ error }: HttpErrorResponse) => {
        console.log(error)
      }
    }))
  }

  ngOnDestroy(): void {
    this._sub.unsubscribe()
  }

  navigateToBookStaycation(id: string) {
    this.router.navigate(['main/staycation-details', id]);
    console.log("Click");
  }
  
  goBack() {
    this.location.back();
  }
  
  
}
