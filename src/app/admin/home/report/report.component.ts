import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Fullname } from 'src/app/interfaces/profile';
import { BasicUtilService } from 'src/app/services/basic-util.service';
import { ReportService } from 'src/app/services/report.service';
import { ViewReportComponent } from './view-report/view-report.component';
import { ActionReportComponent } from './action-report/action-report.component';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class ReportComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = [
    'reporter',
    'reported',
    'message',
    'action-given',
    'action',
  ];

  subscription: Subscription = new Subscription();

  isLoading: boolean = false;
  total: number = 0;

  constructor(
    private _changeDetector: ChangeDetectorRef,
    private _report: ReportService,
    private _util: BasicUtilService,
    private _dialog: MatDialog
  ) {}

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit(): void {
    this.getReports(this.paginator.pageSize, this.paginator.pageIndex + 1);
    this.dataSource.paginator = this.paginator;
    this._changeDetector.detectChanges();
  }

  private getReports(limit: number, page: number): void {
    this.dataSource = new MatTableDataSource<any>([]);
    this.isLoading = true;
    this.subscription.add(
      this._report.getReports(limit, page).subscribe({
        next: (res) => {
          this.dataSource = new MatTableDataSource<any>(
            res[0].paginatedResults
          );
          this.total = <number>res[0].totalCount[0].count;
          this.isLoading = false;
        },
        error: (error) => {
          console.log(error);
          this.isLoading = false;
        },
      })
    );
  }

  public handlePageChange(e: PageEvent) {
    this.getReports(e.pageSize, e.pageIndex + 1);
  }

  handleViewReport(report: any): void {
    const view = this._dialog.open(ViewReportComponent, {
      disableClose: true,
      maxWidth: '40rem',
      width: '90%',
      data: report,
    });
  }

  handleAction(report: any, type: string): void {
    const action = this._dialog.open(ActionReportComponent, {
      disableClose: true,
      maxWidth: '40rem',
      width: '90%',
      data: { ...report, type },
    });

    action.afterClosed().subscribe((result) => {
      const { success, type, data } = result;
      if (success) {
        const tableData = this.dataSource.data;
        const index = tableData.findIndex((item) => item._id === data._id);
        if (index !== -1) {
          tableData[index] = { ...tableData[index], action: type };
          this.dataSource.data = [...tableData];
        }
      }
    });
  }

  fullName(name: Fullname): string {
    return this._util.constructName(name);
  }

  setAction(action: string): string {
    return action === 'no-action'
      ? 'No Action'
      : action === 'warning'
      ? 'Warning'
      : action === 'suspend'
      ? 'Suspended'
      : 'Terminated';
  }
}
