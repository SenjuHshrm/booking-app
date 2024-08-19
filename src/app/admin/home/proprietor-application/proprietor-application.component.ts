import { ListingsComponent } from './listings/listings.component';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { BasicUtilService } from './../../../services/basic-util.service';
import { UserService } from './../../../services/user.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Component, ViewChild, OnInit, AfterViewInit, OnDestroy, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-proprietor-application',
  templateUrl: './proprietor-application.component.html',
  styleUrls: ['./proprietor-application.component.scss']
})
export class ProprietorApplicationComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(MatPaginator) paginator!: MatPaginator

  public total: number = 0;
  public appList: any = []
  public dataSource!: MatTableDataSource<any>

  public displayedColumns: string[] = ['profile', 'firstname', 'lastname', 'approved', 'staycation', 'action']
  // public displayedColumns: string[] = ['profile', 'firstname', 'lastname', 'action']

  private _sub: Subscription = new Subscription()

  constructor(
    private _md: MatDialog,
    private _user: UserService,
    private _basicUtil: BasicUtilService,
    private _changeDetector: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    this._getApps(this.paginator.pageIndex + 1, this.paginator.pageSize)
    this.dataSource.paginator = this.paginator
    this._changeDetector.detectChanges()
  }

  ngOnDestroy(): void {
    this._sub.unsubscribe()
  }

  public handlePageChange(e: PageEvent) {
    this._getApps(e.pageIndex + 1, e.pageSize)
  }

  public viewListings(userId: string) {
    this._md.open(ListingsComponent, {
      width: '65%',
      height: '70%',
      data: userId,
      disableClose: true
    })
  }

  public handleSetAsHost(userId: string, staycationId: string, propApp: string) {
    this._sub.add(this._user.setAsHost(userId, staycationId, propApp).subscribe({
      next: (res: { success: boolean }) => {
        this._getApps(this.paginator.pageIndex + 1, this.paginator.pageSize)
      }
    }))
  }

  private _getApps(p: number, l: number) {
    this.appList = []
    this.dataSource = new MatTableDataSource<any>()
    this._sub.add(this._user.getProprietorApplications(p, l).subscribe({
      next: (res: any) => {
        let { paginatedResults, totalCount } = res[0]
        // this.total = res.total
        // res.propApp.forEach((prop: any) => {
        //   this.appList.push({
        //     profile: this._basicUtil.setImgUrl(prop.userId.img),
        //     firstname: prop.userId.name.fName,
        //     lastname: prop.userId.name.lName,
        //     staycation: prop.staycationId.name,
        //     userId: prop.userId._id,
        //     staycationId: prop.staycationId._id,
        //     propAppId: prop._id
        //   })
        // })
        this.total = totalCount[0].count
        paginatedResults.forEach((prop: any) => {
          this.appList.push({
            profile: this._basicUtil.setImgUrl(prop.user[0].img),
            firstname: prop.user[0].name.fName,
            lastname: prop.user[0].name.lName,
            // staycation: prop.staycationId.name,
            approved: (prop.user[0].approvedAsProprietorOn !== '') ? true : false,
            userId: prop.userId,
            // staycationId: prop.staycationId._id,
            propAppId: prop._id
          })
        })
        this.dataSource = new MatTableDataSource<any>(this.appList)
      }
    }))
  }

}
