import { switchMap, catchError } from 'rxjs/operators';
import { AuthService } from './../../../../../../services/auth.service';
import { Component, inject, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  private _snack: MatSnackBar = inject(MatSnackBar);

  constructor(
    private _util: BasicUtilService,
    private dialogRef: MatDialogRef<DeleteDestinationCarouselComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _carousel: CarouselService,
    private _auth: AuthService
  ) {}

  handleClose(success: boolean): void {
    if (this.isLoading) return;
    this.dialogRef.close({ success });
  }

  handleDelete(): void {
    this.isLoading = true;
    this.subscription.add(
      this._auth.csrfToken()
        .pipe(
          switchMap(x => this._carousel.deleteCarouselImage('back', this.data._id, x.token)),
          catchError(e => e)
        ).subscribe({
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
