import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BasicUtilService } from 'src/app/services/basic-util.service';

@Component({
  selector: 'app-view-destination-carousel',
  templateUrl: './view-destination-carousel.component.html',
  styleUrls: ['./view-destination-carousel.component.scss'],
})
export class ViewDestinationCarouselComponent {
  constructor(
    private _util: BasicUtilService,
    private dialogRef: MatDialogRef<ViewDestinationCarouselComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  handleClose(): void {
    this.dialogRef.close();
  }

  get imageUrl(): string {
    return this._util.setImgUrl('/' + this.data.img);
  }
}
