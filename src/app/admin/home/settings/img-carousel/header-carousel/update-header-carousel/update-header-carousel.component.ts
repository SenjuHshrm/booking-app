import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from './../../../../../../services/auth.service';
import { Component, inject, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { FormErrorMessage } from 'src/app/interfaces/input-error-message';
import { BasicUtilService } from 'src/app/services/basic-util.service';
import { CarouselService } from 'src/app/services/carousel.service';

@Component({
  selector: 'app-update-header-carousel',
  templateUrl: './update-header-carousel.component.html',
  styleUrls: ['./update-header-carousel.component.scss'],
})
export class UpdateHeaderCarouselComponent {
  public isLoading: boolean = false;

  createForm!: FormGroup;

  imageErrors: FormErrorMessage[] = [
    {
      field: 'image',
      error: 'required',
      message: 'Image is required.',
    },
  ];

  fileToUpload!: File;
  imageUrl: string = '';
  filename: string = '';

  subscription: Subscription = new Subscription();
  private _snack: MatSnackBar = inject(MatSnackBar);

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UpdateHeaderCarouselComponent>,
    private _carousel: CarouselService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _util: BasicUtilService,
    private _auth: AuthService
  ) {}

  ngOnInit(): void {
    this.createForm = this.fb.group({
      image: new FormControl('', {}),
      isActive: new FormControl(this.data.isActive),
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imageUrl = e.target.result;
      this.filename = file.name;
      this.fileToUpload = file;
      this.createForm.controls['image'].setValue(file);
    };
    reader.readAsDataURL(file);
  }

  handleClose(success: boolean): void {
    if (this.isLoading) return;
    let data: any = { success };
    if (success) data.data = this.data;
    this.dialogRef.close({ data });
  }

  onSubmit(form: FormGroup): void {
    if (!form.valid) return;

    this.isLoading = true;
    const imageData = form.getRawValue();

    const carouselData = new FormData();
    carouselData.append('isActive', imageData.isActive);
    if (this.filename !== '') {
      carouselData.append('img', this.filename);
      carouselData.append('imgFile', imageData.image);
    }

    this.subscription.add(
      this._auth.csrfToken()
        .pipe(
          switchMap(x => this._carousel.updateCarouselImage('front', this.data._id, carouselData, x.token)),
          catchError(e => e)
        )
        .subscribe({
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

  get setImageUrl(): string {
    return this._util.setImgUrl('/' + this.data.img);
  }
}
