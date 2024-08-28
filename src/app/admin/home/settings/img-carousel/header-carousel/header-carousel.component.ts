import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { CreateHeaderCarouselComponent } from './create-header-carousel/create-header-carousel.component';

@Component({
  selector: 'app-header-carousel',
  templateUrl: './header-carousel.component.html',
  styleUrls: ['./header-carousel.component.scss'],
})
export class HeaderCarouselComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['question', 'answer', 'action'];

  dataSource!: MatTableDataSource<any>;

  public total: number = 0;
  public isLoading: boolean = false;

  private subscription: Subscription = new Subscription();

  constructor(
    private dialog: MatDialog,
    private _changeDetector: ChangeDetectorRef
  ) {}

  public handlePageChange(e: PageEvent) {
    // this.getFaqs(e.pageSize, e.pageIndex + 1);
  }

  handleCreateFrontCarousel(): void {
    const create = this.dialog.open(CreateHeaderCarouselComponent, {
      disableClose: true,
      panelClass: 'custom-carousel-modal',
      maxWidth: '40rem',
    });
  }

  handleViewFrontCarousel(data: any): void {}

  handleUpdateFrontCarousel(data: any): void {}

  handleDeleteFrontCarousel(data: any): void {}
}
