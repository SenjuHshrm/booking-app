import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-identification',
  templateUrl: './identification.component.html',
  styleUrls: ['./identification.component.scss'],
})
export class IdentificationComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  public subscription: Subscription = new Subscription();
  public total: number = 0;

  constructor(private _user: UserService) {}

  dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = [
    'profile',
    'firstname',
    'lastname',
    'identification',
    'status',
    'action',
  ];

  ngOnInit() {}

  ngAfterViewInit(): void {
    this._getVerifications(
      this.paginator.pageSize,
      this.paginator.pageIndex + 1
    );
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    if (!this.subscription) return;
    this.subscription.unsubscribe();
  }

  _getVerifications(limit: number, page: number): void {
    this.subscription.add(
      this._user.getVerificationList(page, limit).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (error) => {
          console.log(error);
        },
      })
    );
  }
}
