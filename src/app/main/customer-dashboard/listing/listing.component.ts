import { BasicUtilService } from './../../../services/basic-util.service';
import { TokenService } from './../../../services/token.service';
import { ITokenClaims } from './../../../interfaces/token';
import { Subscription } from 'rxjs';
import { StaycationService } from './../../../services/staycation.service';
import { Component, ViewChild, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CreateListingComponent } from 'src/app/globals/create-listing/create-listing.component';
import * as moment from 'moment'
import { Router } from '@angular/router';
import { fadeInAnimation } from 'src/app/globals/fadein-animations';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss'],
  animations:[fadeInAnimation]
})


export class ListingComponent implements OnInit, AfterViewInit, OnDestroy {
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  public hostListing: any = []
  public total: number = 0;

  private _sub: Subscription = new Subscription()
  private _claims!: ITokenClaims

  constructor(
    private router:Router,
    public createlistingDialog:MatDialog,
    private _staycation: StaycationService,
    private _token: TokenService,
    private _basicUtil: BasicUtilService
  ) {
    this.paginator = {} as MatPaginator;
  }

  
  openCreateListingDialog(): void {
    const dialogCreateListing = this.createlistingDialog.open(CreateListingComponent, {
      panelClass: 'custom-createlisting-modal'
    });
  
    dialogCreateListing.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }

  dataSource = new MatTableDataSource<any>([
    { listing: '../assets/images/main/staycation-list/image 0.png', status: 'Listed',todo:'Update',instantbook:'On',bedrooms:'6',beds:'2',bath:'2',location:'Laguna,Philipines',lastmodified:'Yesterday',action:''},
    { listing: '../assets/images/main/staycation-list/image 1.png', status: 'Listed',todo:'Update',instantbook:'On',bedrooms:'6',beds:'2',bath:'2',location:'Laguna,Philipines',lastmodified:'Yesterday',action:''},
    { listing: '../assets/images/main/staycation-list/image 2.png', status: 'Listed',todo:'Update',instantbook:'On',bedrooms:'6',beds:'2',bath:'2',location:'Laguna,Philipines',lastmodified:'Yesterday',action:''},
    { listing: '../assets/images/main/staycation-list/image 3.png', status: 'Listed',todo:'Update',instantbook:'On',bedrooms:'6',beds:'2',bath:'2',location:'Laguna,Philipines',lastmodified:'Yesterday',action:''},
    { listing: '../assets/images/main/staycation-list/image 4.png', status: 'Listed',todo:'Update',instantbook:'On',bedrooms:'6',beds:'2',bath:'2',location:'Laguna,Philipines',lastmodified:'Yesterday',action:''},
    { listing: '../assets/images/main/staycation-list/image 5.png', status: 'Listed',todo:'Update',instantbook:'On',bedrooms:'6',beds:'2',bath:'2',location:'Laguna,Philipines',lastmodified:'Yesterday',action:''},
    { listing: '../assets/images/main/staycation-list/image 6.png', status: 'Listed',todo:'Update',instantbook:'On',bedrooms:'6',beds:'2',bath:'2',location:'Laguna,Philipines',lastmodified:'Yesterday',action:''},
    { listing: '../assets/images/main/staycation-list/image 7.png', status: 'Listed',todo:'Update',instantbook:'On',bedrooms:'6',beds:'2',bath:'2',location:'Laguna,Philipines',lastmodified:'Yesterday',action:''},
    { listing: '../assets/images/main/staycation-list/image 8.png', status: 'Listed',todo:'Update',instantbook:'On',bedrooms:'6',beds:'2',bath:'2',location:'Laguna,Philipines',lastmodified:'Yesterday',action:''},
    { listing: '../assets/images/main/staycation-list/image 9.png', status: 'Listed',todo:'Update',instantbook:'On',bedrooms:'6',beds:'2',bath:'2',location:'Laguna,Philipines',lastmodified:'Yesterday',action:''},
    { listing: '../assets/images/main/staycation-list/image 10.png', status: 'Listed',todo:'Update',instantbook:'On',bedrooms:'6',beds:'2',bath:'2',location:'Laguna,Philipines',lastmodified:'Yesterday',action:''},
 
    // Add more data as needed
  ]);

  displayedColumns: string[] = ['listing','bedrooms','beds','bath','location','status','lastmodified','action'];

  ngOnInit() {
    this._claims = <ITokenClaims>this._token.decodedToken()
  }

  ngAfterViewInit(): void {
    this._getListings(this.paginator.pageIndex + 1, this.paginator.pageSize)
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    this._sub.unsubscribe()
  }



  public handleCreateListing(){
      this.router.navigate(['register-proprietorship']);
  }

  
  updateListing() {
    this.router.navigate(['main/dashboard/update-listing']);
  }
  
 

  public handlePageChange(e: PageEvent) {
    this._getListings(e.pageIndex + 1, e.pageSize)
  }

  public handleToggleListing(id: string, isListed: boolean) {
    this._sub.add(this._staycation.updateListing(id, !isListed).subscribe({
      next: (res: any) => {
        this._getListings(this.paginator.pageIndex + 1, this.paginator.pageSize)
      }
    }))
  }

  private _getListings(p: number, l: number) {
    this.hostListing = []
    this.dataSource = new MatTableDataSource<any>()
    this._sub.add(this._staycation.getHostListing(this._claims.sub, p, l).subscribe({
      next: (res: any) => {
        this.total = res.total
        res.listings.forEach((list: any) => {
          this.hostListing.push({
            listing: this._basicUtil.setImgUrl(list.media.cover),
            status: (list.isListed) ? 'Listed' : 'Not Listed',
            // todo: '',
            // instantbook: 'On',
            bedrooms: list.details.bedrooms,
            beds: list.details.beds,
            bath: list.details.bathroom,
            location: `${list.address.province}, ${list.address.country}`,
            lastmodified: moment(list.updatedAt).format('MMMM DD, YYYY HH:mm:ss a'),
            isListed: list.isListed,
            _id: list._id
          })
        })
        this.dataSource = new MatTableDataSource<any>(this.hostListing);
      }
    }))
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}



// dataSource = new MatTableDataSource<any>([
//   { listing: '../assets/images/main/staycation-list/image 0.png ', status: 'Listed',todo:'Update',instantbook:'On',bedrooms:6,beds:2,bath:2, location:'Laguna,Philippines',lastmodified:'Yesterday',action:'' }
//   // Add more data as needed
// ]);

// displayedColumns: string[] = ['listing', 'status','todo','instantbook','bedrooms','beds','bath','location','lastmodified','action'];