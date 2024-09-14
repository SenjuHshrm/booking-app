import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from './../../../services/auth.service';
import { ListingsComponent } from './listings/listings.component';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { BasicUtilService } from './../../../services/basic-util.service';
import { UserService } from './../../../services/user.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import {
  Component,
  ViewChild,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';
import { ViewProfileModalComponent } from 'src/app/globals/modals/view-profile-modal/view-profile-modal.component';
import { ValidationModalComponent } from './validation-modal/validation-modal.component';

@Component({
  selector: 'app-proprietor-application',
  templateUrl: './proprietor-application.component.html',
  styleUrls: ['./proprietor-application.component.scss'],
})
export class ProprietorApplicationComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  public total: number = 0;
  public appList: any = [];
  public dataSource!: MatTableDataSource<any>;

  public displayedColumns: string[] = [
    'profile',
    'firstname',
    'lastname',
    'approved',
    'action',
  ];

  validationText: any = [
    { suspend: 'Are you sure you want to suspend this account?' },
    { delete: 'Are you sure you want to delete this account?' },
    { logout: 'Are you sure you want to logout this account?' },
  ];

  // public displayedColumns: string[] = ['profile', 'firstname', 'lastname', 'action']

  private _sub: Subscription = new Subscription();

  constructor(
    private _md: MatDialog,
    private _user: UserService,
    private _basicUtil: BasicUtilService,
    private _changeDetector: ChangeDetectorRef,
    private dialog: MatDialog,
    private _auth: AuthService
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this._getApps(this.paginator.pageIndex + 1, this.paginator.pageSize);
    this.dataSource.paginator = this.paginator;
    this._changeDetector.detectChanges();
  }

  ngOnDestroy(): void {
    this._sub.unsubscribe();
  }

  public handlePageChange(e: PageEvent) {
    this._getApps(e.pageIndex + 1, e.pageSize);
  }

  public viewListings(userId: string) {
    this._md.open(ListingsComponent, {
      width: '65%',
      height: '70%',
      data: userId,
      disableClose: true,
    });
  }

  public handleSetAsHost(
    userId: string,
    staycationId: string,
    propApp: string
  ) {
    this._sub.add(
      this._auth.csrfToken()
        .pipe(
          switchMap((x) => this._user.setAsHost(userId, staycationId, propApp, x.token)),
          catchError((e) => e)
        ).subscribe({
          next: (res: any) => {
            this._getApps(this.paginator.pageIndex + 1, this.paginator.pageSize);
          },
        })
    );

    // this._user.setAsHost(userId, staycationId, propApp).subscribe({
    //   next: (res: { success: boolean }) => {
    //     this._getApps(this.paginator.pageIndex + 1, this.paginator.pageSize);
    //   },
    // })
  }

  private _getApps(p: number, l: number) {
    this.appList = [];
    this.dataSource = new MatTableDataSource<any>();

    this._sub.add(
      this._user.getProprietorApplications(p, l).subscribe({
        next: (res: any) => {
          let { total, list } = res;

          // res.propApp.forEach((prop: any) => {
          //   this.appList.push({
          //     profile: this._basicUtil.setImgUrl(prop.userId.img),
          //     firstname: prop.userId.name.fName,
          //     lastname: prop.userId.name.lName,
          //     staycation: prop.staycationId.name,
          //     userId: prop.userId._id,
          //     staycationId: prop.staycationId._id,
          //     propAppId: prop._id,
          //   });
          // });

          this.total = total;
          list.forEach((prop: any) => {
            this.appList.push({
              id: prop.user._id,
              profile: this._basicUtil.setImgUrl(prop.user.img),
              firstname: prop.user.name.fName,
              lastname: prop.user.name.lName,
              // staycation: prop.staycationId.name,
              approved: prop.status !== 'pending' ? true : false,
              userId: prop.user._id,
              // staycationId: prop.staycationId._id,
              propAppId: prop._id,
            });
          });
          this.dataSource = new MatTableDataSource<any>(this.appList);
        },
      })
    );
  }

  public viewProfile(id: string): void {
    const profileDialog = this.dialog.open(ViewProfileModalComponent, {
      disableClose: true,
      panelClass: 'custom-view-profile-dialog',
      data: id,
    });
  }

  openValidationModal(text: string): void {
    this.dialog.open(ValidationModalComponent, {
      width: '100%',
      height: '100%',
      maxHeight: '15rem',
      maxWidth: '30rem',
      data: { data: this.validationText, label: text },
    });
  }
}
