import { FormControl } from '@angular/forms';
import { TokenService } from './../../../../services/token.service';
import { HttpErrorResponse } from '@angular/common/http';
import { StaycationService } from './../../../../services/staycation.service';
import { Observable, Subscription } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { ITokenClaims } from './../../../../interfaces/token';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_AUTOCOMPLETE_SCROLL_STRATEGY } from '@angular/material/autocomplete';
import { MAT_SELECT_SCROLL_STRATEGY_PROVIDER } from '@angular/material/select';

@Component({
  selector: 'app-staycationlist-location-modal',
  templateUrl: './staycationlist-location-modal.component.html',
  styleUrls: ['./staycationlist-location-modal.component.scss'],
  // providers: [
  //   {
  //     provide: MAT_AUTOCOMPLETE_SCROLL_STRATEGY,
  //     useValue: MAT_SELECT_SCROLL_STRATEGY_PROVIDER
  //   }
  // ]
})
export class StaycationlistLocationModalComponent implements OnInit, OnDestroy {

  public recentSearches: string[] = []
  public loc: FormControl = new FormControl('');
  public recentSearches$!: Observable<string[]>;

  private _t!: ITokenClaims
  private _sub: Subscription = new Subscription()

  constructor(
    public dialogLogin: MatDialogRef<StaycationlistLocationModalComponent>,
    private _staycation: StaycationService,
    private _token: TokenService
  ) {
    
  }

  ngOnInit(): void {
    this._t = <ITokenClaims>this._token.decodedToken()
    this._getRecentSearch(this._t.sub)
  }

  ngOnDestroy(): void {
    this._sub.unsubscribe()
  }
  
  public closeDialogLocation(fc: FormControl): void {
    this.dialogLogin.close(fc.value);
  }

  private _filter(val: string): string[] {
    let filterVal = val.toLowerCase()
    return this.recentSearches.filter(opt => opt.toLowerCase().includes(filterVal))
  }

  private _getRecentSearch(id: string) {
    this.recentSearches = []
    this._sub.add(this._staycation.getRecentSearches(id).subscribe({
      next: (res: any) => {
        this.recentSearches = res
        this._initAutocomplete()
      },
      error: ({ error }: HttpErrorResponse) => {
        console.log(error)
      }
    }))
  }

  private _initAutocomplete() {
    this.recentSearches$ = this.loc.valueChanges.pipe(
      startWith(''),
      map(val => this._filter(val || ''))
    )
  }
}
