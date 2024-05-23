import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-proprietor-table',
  templateUrl: './proprietor-table.component.html',
  styleUrls: ['./proprietor-table.component.scss']
})
export class ProprietorTableComponent implements OnInit {
  
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
