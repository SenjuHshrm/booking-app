import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from './../../../../../../services/auth.service';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { FormErrorMessage } from 'src/app/interfaces/input-error-message';
import { CarouselService } from 'src/app/services/carousel.service';

@Component({
  selector: 'app-create-header-carousel',
  templateUrl: './create-header-carousel.component.html',
  styleUrls: ['./create-header-carousel.component.scss'],
})
export class CreateHeaderCarouselComponent implements OnInit {
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
    private dialogRef: MatDialogRef<CreateHeaderCarouselComponent>,
    private _carousel: CarouselService,
    private _auth: AuthService
  ) {}

  ngOnInit(): void {
    this.createForm = this.fb.group({
      image: new FormControl('', {
        validators: [Validators.required],
      }),
      isActive: new FormControl(false),
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
    this.dialogRef.close({ success });
  }

  onSubmit(form: FormGroup): void {
    if (!form.valid) return;

    this.isLoading = true;
    const imageData = form.getRawValue();

    const carouselData = new FormData();
    carouselData.append('isActive', imageData.isActive);
    carouselData.append('img', this.filename);
    carouselData.append('imgFile', imageData.image);

    this.subscription.add(
      this._auth.csrfToken()
        .pipe(
          switchMap(x => this._carousel.createCarouselImage('front', carouselData, x.token)),
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
}
