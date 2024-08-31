import { BasicUtilService } from './../../../../services/basic-util.service';
import { environment } from './../../../../../environments/environment';
import { Subscription } from 'rxjs';
import { UserService } from './../../../../services/user.service';
import {
  Component,
  ViewChild,
  OnInit,
  OnDestroy,
  AfterViewInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CreateAdminComponent } from './create-admin/create-admin.component';
import { ViewProfileModalComponent } from 'src/app/globals/modals/view-profile-modal/view-profile-modal.component';
import { ValidationModalComponent } from '../validation-modal/validation-modal.component';

@Component({
  selector: 'app-admin-table',
  templateUrl: './admin-table.component.html',
  styleUrls: ['./admin-table.component.scss'],
})
export class AdminTableComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private _sub: Subscription = new Subscription();
  public total: number = 0;

  public userList: any = [];

  constructor(
    public createAdmin: MatDialog,
    private _user: UserService,
    private _basicUtil: BasicUtilService,
    private dialog: MatDialog
  ) {
    // this.paginator = {} as MatPaginator;
  }

  ngOnDestroy(): void {
    this._sub.unsubscribe();
  }

  validationText:any = [
    {suspend:'Are you sure you want to suspend this account?'},
    {delete:'Are you sure you want to delete this account?'},
  ]

  dataSource = new MatTableDataSource<any>([
    {
      profile: '../assets/images/main/staycation-details/avatar.png',
      username: 'Juan Miguel',
      status: 'Active',
      action: '',
    },
    {
      profile: '../assets/images/main/staycation-details/avatar.png',
      username: 'Juan Miguel',
      status: 'Active',
      action: '',
    },
  ]);

  displayedColumns: string[] = ['profile', 'username', 'status', 'action'];

  ngOnInit() {}

  ngAfterViewInit() {
    this._getUsers(this.paginator.pageIndex + 1, this.paginator.pageSize);
    this.dataSource.paginator = this.paginator;
  }

  public handlePageChange(e: PageEvent) {
    this._getUsers(e.pageIndex + 1, e.pageSize);
  }

  createAdminModal(): void {
    const dialogRefLogin = this.createAdmin.open(CreateAdminComponent, {
      width: '100%',
      maxWidth: '40rem',
      height: '100%',
      maxHeight: '40rem',
    });

    dialogRefLogin.afterClosed().subscribe(() => {
      this._getUsers(this.paginator.pageIndex + 1, this.paginator.pageSize);
    });
  }

  private _getUsers(p: number, l: number) {
    this.userList = [];
    this.dataSource = new MatTableDataSource<any>();
    this._sub.add(
      this._user.getUsersByAccess('admin', p, l).subscribe({
        next: (res: any) => {
          this.total = res.total;
          res.auth.forEach((user: any) => {
            this.userList.push({
              id: user.userId._id,
              profile: this._basicUtil.setImgUrl(user.userId.img),
              username: this._basicUtil.constructName(user.userId.name),
              status: user.userId.status,
            });
            this.dataSource = new MatTableDataSource<any>(this.userList);
          });
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


  openValidationModal(text:string): void {
    this.dialog.open(ValidationModalComponent, {
      width:'100%',
      height:'100%',
      maxHeight:'15rem',
      maxWidth:'30rem',
      data:{data:this.validationText, validateText:text}
    });
  }
}
