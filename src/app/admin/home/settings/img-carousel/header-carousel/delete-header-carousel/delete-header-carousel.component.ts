import { Component, inject, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BasicUtilService } from 'src/app/services/basic-util.service';
import { ViewHeaderCarouselComponent } from '../view-header-carousel/view-header-carousel.component';
import { Subscription } from 'rxjs';
import { CarouselService } from 'src/app/services/carousel.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-header-carousel',
  templateUrl: './delete-header-carousel.component.html',
  styleUrls: ['./delete-header-carousel.component.scss'],
})
export class DeleteHeaderCarouselComponent {
  isLoading: boolean = false;

  subscription: Subscription = new Subscription();
  private _snack: MatSnackBar = inject(MatSnackBar);

  constructor(
    private _util: BasicUtilService,
    private dialogRef: MatDialogRef<ViewHeaderCarouselComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _carousel: CarouselService
  ) {}

  handleClose(success: boolean): void {
    if (this.isLoading) return;
    this.dialogRef.close({ success });
  }

  handleDelete(): void {
    this.isLoading = true;
    this.subscription.add(
      this._carousel.deleteCarouselImage('front', this.data._id).subscribe({
        next: (res) => {
          this.isLoading = false;
          this.handleClose(true);
        },
        error: (error) => {
          this.isLoading = false;
          this._snack.open(error.error.code, '', { duration: 1000 });
        },
      })
    );
  }

  get imageUrl(): string {
    return this._util.setImgUrl('/' + this.data.img);
  }
}
