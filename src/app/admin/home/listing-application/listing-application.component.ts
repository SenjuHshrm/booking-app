import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { CheckListingInputComponent } from '../proprietor-application/check-listing-input/check-listing-input.component';

@Component({
  selector: 'app-listing-application',
  templateUrl: './listing-application.component.html',
  styleUrls: ['./listing-application.component.scss'],
})
export class ListingApplicationComponent {
  public dataSource = new MatTableDataSource<any>([]);
  public displayedColumns: string[] = [
    'cover',
    'name',
    'placeType',
    'desc',
    'approved',
    'listed',
    'action',
  ];

  constructor(private _md: MatDialog) {}

  public handleViewListing(data: any): void {}

  public openListing(id: string) {
    let d: MatDialogRef<CheckListingInputComponent> = this._md.open(
      CheckListingInputComponent,
      {
        width: '80%',
        height: '90vh',
        data: id,
        disableClose: true,
      }
    );
    d.afterClosed().subscribe((res: any) => {
      // if(res) {
      //   let i = this.listings.findIndex((j: any) => res.id === j.id)
      //   this.listings[i] = { ...this.listings[0], cover: this._basicUtil.setImgUrl(res.cover), isListed: res.isListed, isApproved: res.isApproved }
      //   this.dataSource = new MatTableDataSource<any>(this.listings)
      //   this.dataSource.paginator = this.paginator
      // }
    });
  }
}
