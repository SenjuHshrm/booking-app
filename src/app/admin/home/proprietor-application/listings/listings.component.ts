import { BasicUtilService } from './../../../../services/basic-util.service';
import { CheckListingInputComponent } from './../check-listing-input/check-listing-input.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StaycationService } from './../../../../services/staycation.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy, Inject, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.scss']
})
export class ListingsComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(MatPaginator) paginator!: MatPaginator

  public total: number = 0;
  public listings: any = []
  public dataSource!: MatTableDataSource<any>;
  public displayedColumns: string[] = ['cover', 'name', 'placeType', 'desc', 'approved', 'listed', 'action']

  private _sub: Subscription = new Subscription()

  constructor(
    private _staycation: StaycationService,
    private _md: MatDialog,
    private _mdRef: MatDialogRef<ListingsComponent>,
    @Inject(MAT_DIALOG_DATA) private userId: string,
    private _changeDetector: ChangeDetectorRef,
    private _basicUtil: BasicUtilService
  ) { }

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    this._getHostList(this.paginator.pageIndex + 1, this.paginator.pageSize)
    this._changeDetector.detectChanges()
  }

  ngOnDestroy(): void {
    this._sub.unsubscribe()
  }

  public handlePageSizeLimit(e: PageEvent) {
    this._getHostList(e.pageIndex + 1, e.pageSize)
  }

  public openListing(id: string) {
    let d: MatDialogRef<CheckListingInputComponent> = this._md.open(CheckListingInputComponent, {
      width: '80%',
      height: '90vh',
      data: id,
      disableClose: true
    })
    d.afterClosed().subscribe((res: any) => {
      if(res) {
        let i = this.listings.findIndex((j: any) => res.id === j.id)
        this.listings[i] = { ...this.listings[0], cover: this._basicUtil.setImgUrl(res.cover), isListed: res.isListed, isApproved: res.isApproved }
        this.dataSource = new MatTableDataSource<any>(this.listings)
        this.dataSource.paginator = this.paginator
      }
    })
  }

  private _getHostList(p: number, l: number) {
    this.listings =[]
    this._sub.add(this._staycation.getHostListing(this.userId, p, l).subscribe({
      next: (res: any) => {
        this.total = res.total
        res.listings.forEach((listing: any) => {
          this.listings.push({
            id: listing._id,
            host: listing.host,
            cover: (listing.cover !== '') ? this._basicUtil.setImgUrl(listing.cover) : listing.cover,
            name: listing.name,
            type: listing.placeType,
            desc: listing.descriptionFilter,
            isApproved: listing.isApproved,
            isListed: listing.isListed
          })
        })
        this.dataSource = new MatTableDataSource<any>(this.listings)
        this.dataSource.paginator = this.paginator
      },
      error: ({ error }: HttpErrorResponse) => {
        console.log(error)
      }
    }))
  }
}
