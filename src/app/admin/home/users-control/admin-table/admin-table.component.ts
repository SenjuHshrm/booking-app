import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CreateAdminComponent } from './create-admin/create-admin.component';



@Component({
  selector: 'app-admin-table',
  templateUrl: './admin-table.component.html',
  styleUrls: ['./admin-table.component.scss']
})
export class AdminTableComponent {
    
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    public createAdmin:MatDialog) {
    this.paginator = {} as MatPaginator;
  }

  dataSource = new MatTableDataSource<any>([
    { profile: '../assets/images/main/staycation-details/avatar.png', username: 'Juan Miguel',status:'Active',action:''},
    { profile: '../assets/images/main/staycation-details/avatar.png', username: 'Juan Miguel',status:'Active',action:''},

  ]);

  displayedColumns: string[] = ['profile', 'username','status','action'];

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }


createAdminModal(): void {
  const dialogRefLogin = this.createAdmin.open(CreateAdminComponent, {
      width: '40rem',
    });


  dialogRefLogin.afterClosed().subscribe(() => {
    console.log('The dialog was closed');
  });
}
}



