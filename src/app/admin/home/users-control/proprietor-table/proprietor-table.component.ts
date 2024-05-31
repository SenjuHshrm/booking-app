import { Subscription } from 'rxjs';
import { BasicUtilService } from './../../../../services/basic-util.service';
import { UserService } from './../../../../services/user.service';
import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-proprietor-table',
  templateUrl: './proprietor-table.component.html',
  styleUrls: ['./proprietor-table.component.scss']
})
export class ProprietorTableComponent implements OnInit, AfterViewInit, OnDestroy {
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  public total: number = 0
  public userList: any = []

  private _sub: Subscription = new Subscription()

  constructor(
    public createlistingDialog:MatDialog,
    private _user: UserService,
    private _basicUtil: BasicUtilService
  ) {
    // this.paginator = {} as MatPaginator;
  }

  dataSource = new MatTableDataSource<any>([
    { profile: '../assets/images/main/staycation-details/avatar.png', firstname: 'Juan',lastname: 'Miguel',email: 'juanmigeul@email.com',status:'Active',action:''},
    { profile: '../assets/images/main/staycation-details/avatar.png', firstname: 'Juan',lastname: 'Miguel',email: 'juanmigeul@email.com',status:'Active',action:''},
    { profile: '../assets/images/main/staycation-details/avatar.png', firstname: 'Juan',lastname: 'Miguel',email: 'juanmigeul@email.com',status:'Active',action:''},
    { profile: '../assets/images/main/staycation-details/avatar.png', firstname: 'Juan',lastname: 'Miguel',email: 'juanmigeul@email.com',status:'Active',action:''},
    { profile: '../assets/images/main/staycation-details/avatar.png', firstname: 'Juan',lastname: 'Miguel',email: 'juanmigeul@email.com',status:'Active',action:''},
    { profile: '../assets/images/main/staycation-details/avatar.png', firstname: 'Juan',lastname: 'Miguel',email: 'juanmigeul@email.com',status:'Active',action:''},
    { profile: '../assets/images/main/staycation-details/avatar.png', firstname: 'Juan',lastname: 'Miguel',email: 'juanmigeul@email.com',status:'Active',action:''},
    { profile: '../assets/images/main/staycation-details/avatar.png', firstname: 'Juan',lastname: 'Miguel',email: 'juanmigeul@email.com',status:'Active',action:''},
    { profile: '../assets/images/main/staycation-details/avatar.png', firstname: 'Juan',lastname: 'Miguel',email: 'juanmigeul@email.com',status:'Active',action:''},
    { profile: '../assets/images/main/staycation-details/avatar.png', firstname: 'Juan',lastname: 'Miguel',email: 'juanmigeul@email.com',status:'Active',action:''},
 

  ]);


  displayedColumns: string[] = ['profile', 'firstname','lastname','email','status','action'];

  ngOnInit() {
    
  }

  ngAfterViewInit(): void {
    this._getUsers(this.paginator.pageIndex + 1, this.paginator.pageSize)
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    this._sub.unsubscribe()
  }

  public handlePageChange(e: PageEvent) {
    this._getUsers(e.pageIndex + 1, e.pageSize)
  }

  private _getUsers(p: number, l: number) {
    this.userList = []
    this.dataSource = new MatTableDataSource<any>()
    this._sub.add(this._user.getUsersByAccess('host', this.paginator.pageIndex + 1, this.paginator.pageSize).subscribe({
      next: (res: any) => {
        this.total = res.total,
        res.auth.forEach((user: any) => {
          this.userList.push({
            profile: this._basicUtil.setImgUrl(user.userId.img),
            firstname: user.userId.name.fName,
            lastname: user.userId.name.lName,
            email: user.email,
            status: user.userId.status
          })
        })
        this.dataSource = new MatTableDataSource<any>(this.userList)
      }
    }))
  }
}
