import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BasicUtilService } from 'src/app/services/basic-util.service';
import { CarouselService } from 'src/app/services/carousel.service';
import { CreateDestinationCarouselComponent } from './create-destination-carousel/create-destination-carousel.component';
import { ViewDestinationCarouselComponent } from './view-destination-carousel/view-destination-carousel.component';
import { UpdateDestinationCarouselComponent } from './update-destination-carousel/update-destination-carousel.component';
import { DeleteDestinationCarouselComponent } from './delete-destination-carousel/delete-destination-carousel.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-destination-carousel',
  templateUrl: './destination-carousel.component.html',
  styleUrls: ['./destination-carousel.component.scss'],
})
export class DestinationCarouselComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['image', 'description', 'isActive', 'action'];

  dataSource!: MatTableDataSource<any>;

  public total: number = 0;
  public isLoading: boolean = false;

  private subscription: Subscription = new Subscription();

  constructor(
    private dialog: MatDialog,
    private _changeDetector: ChangeDetectorRef,
    private _carousel: CarouselService,
    private _util: BasicUtilService
  ) {}

  ngAfterViewInit(): void {
    this.getCarouselImages(
      this.paginator.pageSize,
      this.paginator.pageIndex + 1
    );
    this.dataSource.paginator = this.paginator;
    this._changeDetector.detectChanges();
  }

  private getCarouselImages(limit: number, page: number): void {
    this.dataSource = new MatTableDataSource<any>([]);
    this.isLoading = true;
    this.subscription.add(
      this._carousel.getCarouselByType('back', limit, page).subscribe({
        next: (res) => {
          this.dataSource = new MatTableDataSource<any>(res.list);
          this.total = <number>res.total;
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
    this.getCarouselImages(e.pageSize, e.pageIndex + 1);
  }

  handleCreateDestinationCarousel(): void {
    const create = this.dialog.open(CreateDestinationCarouselComponent, {
      disableClose: true,
      panelClass: 'custom-carousel-modal',
      maxWidth: '40rem',
    });

    create.afterClosed().subscribe((res) => {
      if (res.success) {
        this.getCarouselImages(this.paginator.pageSize, 1);
        this.paginator.pageIndex = 0;
      }
    });
  }

  handleViewFrontCarousel(data: any): void {
    const view = this.dialog.open(ViewDestinationCarouselComponent, {
      disableClose: true,
      panelClass: 'custom-carousel-modal',
      maxWidth: '40rem',
      data,
    });
  }

  handleUpdateFrontCarousel(data: any): void {
    const update = this.dialog.open(UpdateDestinationCarouselComponent, {
      disableClose: true,
      panelClass: 'custom-carousel-modal',
      maxWidth: '40rem',
      data,
    });

    update.afterClosed().subscribe((res) => {
      if (res.data.success) {
        const currentIndex = this.paginator.pageIndex;
        this.getCarouselImages(
          this.paginator.pageSize,
          this.paginator.pageIndex + 1
        );
        this.paginator.pageIndex = currentIndex;
      }
    });
  }

  handleDeleteFrontCarousel(data: any): void {
    const remove = this.dialog.open(DeleteDestinationCarouselComponent, {
      disableClose: true,
      panelClass: 'custom-carousel-modal',
      maxWidth: '40rem',
      data,
    });

    remove.afterClosed().subscribe((res) => {
      if (res.success) {
        const currentIndex = this.paginator.pageIndex;
        this.getCarouselImages(
          this.paginator.pageSize,
          this.paginator.pageIndex + 1
        );
        this.paginator.pageIndex = currentIndex;
      }
    });
  }

  setIsActive(isActive: boolean): string {
    return isActive ? 'Yes' : 'No';
  }

  setSrc(src: string): string {
    return this._util.setImgUrl(src);
  }
}
