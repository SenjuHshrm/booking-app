import { UserService } from 'src/app/services/user.service';
import { BasicUtilService } from 'src/app/services/basic-util.service';
import { StaycationService } from './../../../services/staycation.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Subscription, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators'
import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { CheckListingInputComponent } from '../proprietor-application/check-listing-input/check-listing-input.component';
import * as moment from 'moment';

@Component({
  selector: 'app-listing-application',
  templateUrl: './listing-application.component.html',
  styleUrls: ['./listing-application.component.scss'],
})
export class ListingApplicationComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  public totalListings: number = 0
  public searchInput: string = ''
  public currentPageList: any = []
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

  private _sub: Subscription = new Subscription()
  private _modelChanged: Subject<string> = new Subject<string>();
  private debTime = 500

  constructor(
    private _md: MatDialog,
    private _staycation: StaycationService,
    private _user: UserService,
    private _basicUtil: BasicUtilService
  ) {}

  ngOnInit(): void {
    this._sub.add(this._modelChanged.pipe(debounceTime(this.debTime)).subscribe(() => {
      this._getList(this.paginator.pageIndex + 1, this.paginator.pageSize)
    }))
  }

  ngAfterViewInit(): void {
    this._getList(this.paginator.pageIndex + 1, this.paginator.pageSize)
  }

  ngOnDestroy(): void {
    this._sub.unsubscribe()
  }

  public handleViewListing(data: any): void {}

  public handleSearch(e: any) {
    this._modelChanged.next(e.target.value)
  }

  public handleReqSupportDocs(userId: string, staycationId: string) {
    // console.log(userId, staycationId)
    let currentDate = moment().format('MM/DD/YYYY')
    this._sub.add(this._user.requestSupportDocs(userId, staycationId, currentDate).subscribe({
      next: (res: any) => {
        console.log(res)
      },
      error: ({error}) => {
        console.log(error)
      }
    }))
  }

  public handlePageChange(e: PageEvent) {
    this._getList(e.pageIndex + 1, e.pageSize)
  }

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

  private _getList(p: number, l: number) {
    this.currentPageList = []
    this._sub.add(this._staycation.getAllStaycations(p, l, this.searchInput).subscribe({
      next: (res: any) => {
        console.log(res)
        this.totalListings = res.total
        res.list.forEach((st: any) => {
          this.currentPageList.push({
            ...st,
            cover: this._basicUtil.setImgUrl(st.cover)
          })
        })
        this.dataSource = new MatTableDataSource<any>(this.currentPageList)
        this.dataSource.paginator = this.paginator
      },
      error: ({error}) => {

      }
    }))
  }
}
