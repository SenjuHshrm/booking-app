import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from './../../../../services/auth.service';
import { BasicUtilService } from './../../../../services/basic-util.service';
import { HttpErrorResponse } from '@angular/common/http';
import { StaycationService } from './../../../../services/staycation.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy, Inject, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-check-listing-input',
  templateUrl: './check-listing-input.component.html',
  styleUrls: ['./check-listing-input.component.scss'],
})
export class CheckListingInputComponent implements OnInit, OnDestroy {
  public listingDetails: any;
  public genImg: string[] = [];
  public bedrooms: string[] = [];
  public coverPhoto: number = -1;
  public actions: any = null;
  private _sub: Subscription = new Subscription();

  private _snack: MatSnackBar = inject(MatSnackBar);

  constructor(
    private _mdRef: MatDialogRef<CheckListingInputComponent>,
    @Inject(MAT_DIALOG_DATA) private id: string,
    private _staycation: StaycationService,
    private _basicUtil: BasicUtilService,
    private _auth: AuthService
  ) {}

  ngOnInit(): void {
    this._getListingDetails(this.id);
  }

  ngOnDestroy(): void {
    this._sub.unsubscribe();
  }

  public setAsCover(i: number) {
    this.coverPhoto = i;
    this.listingDetails.cover = this.listingDetails.genImgList[i];
  }

  public updateDetails() {
    let update: any = {
      detailedDescription: this.listingDetails.detailedDescription,
      cover: this.listingDetails.cover,
      isApproved: false,
      isListed: false,
    };
    switch (this.actions) {
      case '2':
        update.isApproved = true;
        break;
      case '3':
        update.isApproved = true;
        update.isListed = true;
    }
    this._sub.add(
      this._auth.csrfToken()
        .pipe(
          switchMap((x) => this._staycation.updateStaycation(this.id, update, x.token)),
          catchError((e) => e)
        ).subscribe({
          next: (res: any) => {
            this._mdRef.close({ ...update, id: this.id });
          },
          error: (error) => {
            this._snack.open(error.error.code, '', { duration: 1000 });
          },
        })
    );
    // this._staycation.updateStaycation(this.id, update).subscribe({
    //   next: (res: any) => {
    //     this._mdRef.close({ ...update, id: this.id });
    //   },
    //   error: (error) => {
    //     this._snack.open(error.error.code, '', { duration: 1000 });
    //   },
    // })
  }

  private _getListingDetails(id: string) {
    this._sub.add(
      this._staycation.getStaycationDetails(id).subscribe({
        next: (res: any) => {
          this.listingDetails = res;
          this.genImg = res.genImgList.map((img: string) =>
            this._basicUtil.setImgUrl(img)
          );
          this.bedrooms = res.bedroomList.map((img: string) =>
            this._basicUtil.setImgUrl(img)
          );
          // this.genImg = [ ...res.genImgList.map((img: string) => this._basicUtil.setImgUrl(img)), ...res.bedroomList.map((img: string) => this._basicUtil.setImgUrl(img))]
        },
        error: (error) => {
          this._snack.open(error.error.code, '', { duration: 1000 });
        },
      })
    );
  }
}
