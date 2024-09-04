import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  inject,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { CreateHeaderCarouselComponent } from './create-header-carousel/create-header-carousel.component';
import { CarouselService } from 'src/app/services/carousel.service';
import { BasicUtilService } from 'src/app/services/basic-util.service';
import { ViewHeaderCarouselComponent } from './view-header-carousel/view-header-carousel.component';
import { UpdateHeaderCarouselComponent } from './update-header-carousel/update-header-carousel.component';
import { DeleteHeaderCarouselComponent } from './delete-header-carousel/delete-header-carousel.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-header-carousel',
  templateUrl: './header-carousel.component.html',
  styleUrls: ['./header-carousel.component.scss'],
})
export class HeaderCarouselComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['image', 'isActive', 'action'];

  dataSource!: MatTableDataSource<any>;

  public total: number = 0;
  public isLoading: boolean = false;

  private subscription: Subscription = new Subscription();
  private _snack: MatSnackBar = inject(MatSnackBar);

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
      this._carousel.getCarouselByType('front', limit, page).subscribe({
        next: (res) => {
          this.dataSource = new MatTableDataSource<any>(res.list);
          this.total = <number>res.total;
          this.isLoading = false;
        },
        error: (error) => {
          this.isLoading = false;
          this._snack.open(error.error.code, '', { duration: 1000 });
        },
      })
    );
  }

  public handlePageChange(e: PageEvent) {
    this.getCarouselImages(e.pageSize, e.pageIndex + 1);
  }

  handleCreateFrontCarousel(): void {
    const create = this.dialog.open(CreateHeaderCarouselComponent, {
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
    const view = this.dialog.open(ViewHeaderCarouselComponent, {
      disableClose: true,
      panelClass: 'custom-carousel-modal',
      maxWidth: '40rem',
      data,
    });
  }

  handleUpdateFrontCarousel(data: any): void {
    const update = this.dialog.open(UpdateHeaderCarouselComponent, {
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
    const remove = this.dialog.open(DeleteHeaderCarouselComponent, {
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
