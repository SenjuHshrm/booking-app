import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import {
  debounceTime,
  distinctUntilChanged,
  Observable,
  Subscription,
  switchMap,
} from 'rxjs';
import { BasicUtilService } from 'src/app/services/basic-util.service';
import { UserService } from 'src/app/services/user.service';
import { ViewVerificationComponent } from './view-verification/view-verification.component';
import { ApproveDisapproveComponent } from './approve-disapprove/approve-disapprove.component';

@Component({
  selector: 'app-identification',
  templateUrl: './identification.component.html',
  styleUrls: ['./identification.component.scss'],
})
export class IdentificationComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatTable) table!: MatTable<any>;

  public subscription: Subscription = new Subscription();
  public total: number = 0;

  searchControl = new FormControl();
  results$!: Observable<any>;

  constructor(
    private _user: UserService,
    private _util: BasicUtilService,
    private _dialog: MatDialog,
    private _changeDetector: ChangeDetectorRef
  ) {}

  dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = [
    'profile',
    'firstname',
    'lastname',
    'identification',
    'status',
    'action',
  ];

  searchKey: string = '';

  ngOnInit() {}

  ngAfterViewInit(): void {
    this._getVerifications(
      this.paginator.pageSize,
      this.paginator.pageIndex + 1
    );
    this.dataSource.paginator = this.paginator;
    this._changeDetector.detectChanges();
  }

  ngOnDestroy(): void {
    if (!this.subscription) return;
    this.subscription.unsubscribe();
  }

  public handlePageChange(e: PageEvent) {
    this._getVerifications(e.pageSize, e.pageIndex + 1);
  }

  _getVerifications(limit: number, page: number, filter?: string): void {
    const searchKey: string = filter ? filter : '';
    this.subscription.add(
      this._user.getVerificationList(page, limit, searchKey).subscribe({
        next: (res) => {
          const { totalCount, paginatedResults } = res[0];
          this.total = totalCount[0]?.count || 0;
          this.dataSource = new MatTableDataSource<any>(paginatedResults);
        },
        error: (error) => {
          console.log(error);
        },
      })
    );
  }

  imgSrc(src: string): string {
    return this._util.setImgUrl(src);
  }

  handleViewVerification(data: any): void {
    const view = this._dialog.open(ViewVerificationComponent, {
      disableClose: true,
      data,
      panelClass: 'custom-verification-modal',
      maxWidth: '50rem',
    });
  }

  handleApproveDisapproveVerification(
    type: 'approve' | 'disapprove',
    data: any
  ): void {
    const approveDisapprove = this._dialog.open(ApproveDisapproveComponent, {
      disableClose: true,
      data: { ...data, action: type },
      panelClass: 'custom-verification-modal',
      maxWidth: '50rem',
    });

    approveDisapprove.afterClosed().subscribe((result) => {
      const { success, data, status } = result.result;
      if (success) {
        const tableData = this.dataSource.data;
        const index = tableData.findIndex((item) => item._id === data._id);
        if (index !== -1) {
          tableData[index] = { ...tableData[index], status: status };
          this.dataSource.data = [...tableData];
        }
      }
    });
  }
}
