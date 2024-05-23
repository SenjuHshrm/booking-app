import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor() {
    this.paginator = {} as MatPaginator;
  }

  dataSource = new MatTableDataSource<any>([
    {  reporter: 'Anna Belen',reported: 'Juan Miguel', message: 'This man is not good as a proprietor',action:''},
    ]);
  displayedColumns: string[] = ['reporter', 'reported','message','action'];

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }
}
