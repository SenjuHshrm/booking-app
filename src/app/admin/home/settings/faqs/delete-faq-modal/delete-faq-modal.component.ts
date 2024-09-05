import { Component, inject, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { IFAQItem } from 'src/app/interfaces/faq';
import { FaqService } from 'src/app/services/faq.service';

@Component({
  selector: 'app-delete-faq-modal',
  templateUrl: './delete-faq-modal.component.html',
  styleUrls: ['./delete-faq-modal.component.scss'],
})
export class DeleteFaqModalComponent implements OnDestroy {
  public isLoading: boolean = false;
  private subscription: Subscription = new Subscription();
  private _snack: MatSnackBar = inject(MatSnackBar);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IFAQItem,
    private dialogRef: MatDialogRef<DeleteFaqModalComponent>,
    private _faq: FaqService
  ) {}

  ngOnDestroy(): void {
    if (!this.subscription) return;
    this.subscription.unsubscribe();
  }

  handleClose(success: boolean): void {
    if (this.isLoading) return;
    this.dialogRef.close({ success });
  }

  handleDelete(): void {
    this.isLoading = true;
    this.subscription.add(
      this._faq.deleteFaq(this.data._id).subscribe({
        next: (res) => {
          this.isLoading = false;
          if (res.success) {
            this.handleClose(true);
          }
        },
        error: (error) => {
          this.isLoading = false;
          this._snack.open(error.error.code, '', { duration: 1000 });
        },
      })
    );
  }
}
