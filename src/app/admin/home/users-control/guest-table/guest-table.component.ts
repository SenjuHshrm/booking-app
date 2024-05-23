import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';



@Component({
  selector: 'app-guest-table',
  templateUrl: './guest-table.component.html',
  styleUrls: ['./guest-table.component.scss']
})
export class GuestTableComponent {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(public createlistingDialog:MatDialog) {
    this.paginator = {} as MatPaginator;
  }

  dataSource = new MatTableDataSource<any>([
    { profile: '../assets/images/main/staycation-details/avatar.png', firstname: 'Juan',lastname: 'Miguel',email: 'juanmigeul@email.com',status:'Active',action:''},
    { profile: '../assets/images/main/staycation-details/avatar.png', firstname: 'Juan',lastname: 'Miguel',email: 'juanmigeul@email.com',status:'Active',action:''},
    { profile: '../assets/images/main/staycation-details/avatar.png', firstname: 'Juan',lastname: 'Miguel',email: 'juanmigeul@email.com',status:'Active',action:''},
    { profile: '../assets/images/main/staycation-details/avatar.png', firstname: 'Juan',lastname: 'Miguel',email: 'juanmigeul@email.com',status:'Active',action:''},
    { profile: '../assets/images/main/staycation-details/avatar.png', firstname: 'Juan',lastname: 'Miguel',email: 'juanmigeul@email.com',status:'Active',action:''},
  
  ]);
    
    
    

  displayedColumns: string[] = ['profile', 'firstname','lastname','email','status','action'];

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }
}
