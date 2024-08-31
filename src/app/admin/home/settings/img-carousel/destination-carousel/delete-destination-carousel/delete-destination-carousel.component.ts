import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { BasicUtilService } from 'src/app/services/basic-util.service';
import { CarouselService } from 'src/app/services/carousel.service';

@Component({
  selector: 'app-delete-destination-carousel',
  templateUrl: './delete-destination-carousel.component.html',
  styleUrls: ['./delete-destination-carousel.component.scss'],
})
export class DeleteDestinationCarouselComponent {
  isLoading: boolean = false;

  subscription: Subscription = new Subscription();

  constructor(
    private _util: BasicUtilService,
    private dialogRef: MatDialogRef<DeleteDestinationCarouselComponent>,
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
      this._carousel.deleteCarouselImage('back', this.data._id).subscribe({
        next: (res) => {
          this.isLoading = false;
          this.handleClose(true);
        },
        error: (error) => {
          this.isLoading = false;
          console.log(error);
        },
      })
    );
  }

  get imageUrl(): string {
    return this._util.setImgUrl('/' + this.data.img);
  }
}
