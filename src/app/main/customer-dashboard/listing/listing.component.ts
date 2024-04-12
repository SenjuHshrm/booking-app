import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})


export class ListingComponent {
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor() {
    this.paginator = {} as MatPaginator;
  }

  dataSource = new MatTableDataSource<any>([
    { listingstatus: 'Owner 1', status: 'Listed',todo:'Update',instantbook:'On',bedrooms:'6',beds:'2',bath:'2',location:'Laguna,Philipines',lastmodified:'Yesterday',action:''},
    { listingstatus: 'Owner 1', status: 'Listed',todo:'Update',instantbook:'On',bedrooms:'6',beds:'2',bath:'2',location:'Laguna,Philipines',lastmodified:'Yesterday',action:''},
    { listingstatus: 'Owner 1', status: 'Listed',todo:'Update',instantbook:'On',bedrooms:'6',beds:'2',bath:'2',location:'Laguna,Philipines',lastmodified:'Yesterday',action:''},
    { listingstatus: 'Owner 1', status: 'Listed',todo:'Update',instantbook:'On',bedrooms:'6',beds:'2',bath:'2',location:'Laguna,Philipines',lastmodified:'Yesterday',action:''},
    { listingstatus: 'Owner 1', status: 'Listed',todo:'Update',instantbook:'On',bedrooms:'6',beds:'2',bath:'2',location:'Laguna,Philipines',lastmodified:'Yesterday',action:''},
    { listingstatus: 'Owner 1', status: 'Listed',todo:'Update',instantbook:'On',bedrooms:'6',beds:'2',bath:'2',location:'Laguna,Philipines',lastmodified:'Yesterday',action:''},
    { listingstatus: 'Owner 1', status: 'Listed',todo:'Update',instantbook:'On',bedrooms:'6',beds:'2',bath:'2',location:'Laguna,Philipines',lastmodified:'Yesterday',action:''},
    { listingstatus: 'Owner 1', status: 'Listed',todo:'Update',instantbook:'On',bedrooms:'6',beds:'2',bath:'2',location:'Laguna,Philipines',lastmodified:'Yesterday',action:''},
    { listingstatus: 'Owner 1', status: 'Listed',todo:'Update',instantbook:'On',bedrooms:'6',beds:'2',bath:'2',location:'Laguna,Philipines',lastmodified:'Yesterday',action:''},
    { listingstatus: 'Owner 1', status: 'Listed',todo:'Update',instantbook:'On',bedrooms:'6',beds:'2',bath:'2',location:'Laguna,Philipines',lastmodified:'Yesterday',action:''},
    { listingstatus: 'Owner 1', status: 'Listed',todo:'Update',instantbook:'On',bedrooms:'6',beds:'2',bath:'2',location:'Laguna,Philipines',lastmodified:'Yesterday',action:''},
 
    // Add more data as needed
  ]);

  displayedColumns: string[] = ['listingstatus', 'status','todo','instantbook','bedrooms','beds','bath','location','lastmodified','action'];

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }
}


// dataSource = new MatTableDataSource<any>([
//   { listingstatus: 'Owner 1 ', status: 'Listed',todo:'Update',instantbook:'On',bedrooms:6,beds:2,bath:2, location:'Laguna,Philippines',lastmodified:'Yesterday',action:'' }
//   // Add more data as needed
// ]);

// displayedColumns: string[] = ['listingstatus', 'status','todo','instantbook','bedrooms','beds','bath','location','lastmodified','action'];