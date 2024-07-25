import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-identification',
  templateUrl: './identification.component.html',
  styleUrls: ['./identification.component.scss']
})
export class IdentificationComponent implements OnInit{
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  constructor() {
    this.paginator = {} as MatPaginator;
  }

  dataSource = new MatTableDataSource<any>([
    { profile: '../assets/images/main/staycation-details/avatar.png', firstname: 'Juan',lastname: 'Miguel',identification: 'Drivers License',status:'Approved',action:''},
    { profile: '../assets/images/main/staycation-details/avatar.png', firstname: 'Juan',lastname: 'Miguel',identification: 'Drivers License',status:'Approved',action:''},
    { profile: '../assets/images/main/staycation-details/avatar.png', firstname: 'Juan',lastname: 'Miguel',identification: 'Drivers License',status:'Approved',action:''},
    { profile: '../assets/images/main/staycation-details/avatar.png', firstname: 'Juan',lastname: 'Miguel',identification: 'Drivers License',status:'Approved',action:''},
    { profile: '../assets/images/main/staycation-details/avatar.png', firstname: 'Juan',lastname: 'Miguel',identification: 'Drivers License',status:'Approved',action:''},
    { profile: '../assets/images/main/staycation-details/avatar.png', firstname: 'Juan',lastname: 'Miguel',identification: 'Drivers License',status:'Approved',action:''},
    { profile: '../assets/images/main/staycation-details/avatar.png', firstname: 'Juan',lastname: 'Miguel',identification: 'Drivers License',status:'Approved',action:''},
    { profile: '../assets/images/main/staycation-details/avatar.png', firstname: 'Juan',lastname: 'Miguel',identification: 'Drivers License',status:'Approved',action:''},
    { profile: '../assets/images/main/staycation-details/avatar.png', firstname: 'Juan',lastname: 'Miguel',identification: 'Drivers License',status:'Approved',action:''},
    { profile: '../assets/images/main/staycation-details/avatar.png', firstname: 'Juan',lastname: 'Miguel',identification: 'Drivers License',status:'Approved',action:''},
  ]);
  displayedColumns: string[] = ['profile', 'firstname','lastname','identification','status','action'];

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }
}
