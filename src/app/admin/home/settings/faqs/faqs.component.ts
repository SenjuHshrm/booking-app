import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { CreateFaqModalComponent } from './create-faq-modal/create-faq-modal.component';
import { ViewFaqModalComponent } from './view-faq-modal/view-faq-modal.component';
import { UpdateFaqModalComponent } from './update-faq-modal/update-faq-modal.component';
import { VisibleFaqModalComponent } from './visible-faq-modal/visible-faq-modal.component';
import { DeleteFaqModalComponent } from './delete-faq-modal/delete-faq-modal.component';
import { FaqService } from 'src/app/services/faq.service';
import { Subscription } from 'rxjs';
import { IFAQ, IFAQItem } from 'src/app/interfaces/faq';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.scss'],
})
export class FaqsComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['question', 'answer', 'action'];

  dataSource!: MatTableDataSource<any>;

  public total: number = 0;
  public isLoading: boolean = false;

  public faqList: IFAQItem[] = [];

  private subscription: Subscription = new Subscription();
  private _snack: MatSnackBar = inject(MatSnackBar);

  constructor(
    private dialog: MatDialog,
    private _faqs: FaqService,
    private _changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.getFaqs(this.paginator.pageSize, this.paginator.pageIndex + 1);
    this.dataSource.paginator = this.paginator;
    this._changeDetector.detectChanges();
  }

  private getFaqs(limit: number, page: number): void {
    this.dataSource = new MatTableDataSource<any>([]);
    this.isLoading = true;
    this.subscription.add(
      this._faqs.getFAQs(page, limit).subscribe({
        next: (res) => {
          this.dataSource = new MatTableDataSource<any>(res.faqs);
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
    this.getFaqs(e.pageSize, e.pageIndex + 1);
  }

  handleCreateFAQModal(): void {
    const create = this.dialog.open(CreateFaqModalComponent, {
      disableClose: true,
      panelClass: 'custom-faq-modal',
    });

    create.afterClosed().subscribe((res) => {
      if (res.success) {
        this.getFaqs(this.paginator.pageSize, 1);
        this.paginator.pageIndex = 0;
      }
    });
  }

  handleViewFAQModal(data: IFAQItem): void {
    const view = this.dialog.open(ViewFaqModalComponent, {
      disableClose: true,
      panelClass: 'custom-faq-modal',
      data,
    });
  }

  handleUpdateFAQModal(data: IFAQItem): void {
    const update = this.dialog.open(UpdateFaqModalComponent, {
      disableClose: true,
      panelClass: 'custom-faq-modal',
      data,
    });

    update.afterClosed().subscribe((res) => {
      if (res.success) {
        const currentIndex = this.paginator.pageIndex;
        this.getFaqs(this.paginator.pageSize, this.paginator.pageIndex + 1);
        this.paginator.pageIndex = currentIndex;
      }
    });
  }

  handleEnableDisableFAQModal(): void {
    const enableDisable = this.dialog.open(VisibleFaqModalComponent, {
      disableClose: true,
      panelClass: 'custom-faq-modal',
    });
  }

  handleDeleteFAQModal(data: IFAQItem): void {
    const remove = this.dialog.open(DeleteFaqModalComponent, {
      disableClose: true,
      panelClass: 'custom-faq-modal',
      data,
    });

    remove.afterClosed().subscribe((res) => {
      if (res.success) {
        const currentIndex = this.paginator.pageIndex;
        this.getFaqs(this.paginator.pageSize, this.paginator.pageIndex + 1);
        this.paginator.pageIndex = currentIndex;
      }
    });
  }
}
