import { BasicUtilService } from './../../services/basic-util.service';
import { Subscription } from 'rxjs';
import { StaycationService } from './../../services/staycation.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { StaycationlistLocationModalComponent } from './component/staycationlist-location-modal/staycationlist-location-modal.component';
import { StaycationlistAddguestModalComponent } from './component/staycationlist-addguest-modal/staycationlist-addguest-modal.component';
import { fadeInAnimation } from 'src/app/globals/fadein-animations';

@Component({
  selector: 'app-staycation-list',
  templateUrl: './staycation-list.component.html',
  styleUrls: ['./staycation-list.component.scss'],
  animations:[fadeInAnimation]
})
export class StaycationListComponent implements OnInit, OnDestroy {

  private _sub: Subscription = new Subscription()

  public page: number = 1;
  public limit: number = 16;
  public total: number = 0

  public listproperties: any = [];

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private _staycation: StaycationService,
    private _basicUtil: BasicUtilService
  ) { }

  ngOnInit(): void {
    this._sub.add(this._staycation.getOfficialList(this.page, this.limit, 'listed=true').subscribe({
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

  ngOnDestroy(): void {
    this._sub.unsubscribe()
  }
  
  showLocationModal(): void {
    const dialogRefLocation = this.dialog.open(StaycationlistLocationModalComponent, {
      panelClass: 'custom-location-modal'
    });

    dialogRefLocation.afterClosed().subscribe(() => {
    console.log('The dialog was closed');
  });
}

    showAddGuestModal(): void {
      const dialogRefGuest = this.dialog.open(StaycationlistAddguestModalComponent, {
        panelClass: 'custom-guest-modal'
      });
  
      dialogRefGuest.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }


  navigateToBookStaycation(id: string) {
    this.router.navigate(['main/staycation-details', id]);
    console.log("Click");
  }

  navigateToHome() {
    this.router.navigate(['']);
    console.log("Click");
  }

  
}
