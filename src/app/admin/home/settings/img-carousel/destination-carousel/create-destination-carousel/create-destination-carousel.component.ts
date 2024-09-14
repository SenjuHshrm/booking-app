import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from './../../../../../../services/auth.service';
import { Component, inject } from '@angular/core';
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
  selector: 'app-create-destination-carousel',
  templateUrl: './create-destination-carousel.component.html',
  styleUrls: ['./create-destination-carousel.component.scss'],
})
export class CreateDestinationCarouselComponent {
  public isLoading: boolean = false;

  createForm!: FormGroup;

  imageErrors: FormErrorMessage[] = [
    {
      field: 'image',
      error: 'required',
      message: 'Image is required.',
    },
  ];

  descriptionErrors: FormErrorMessage[] = [
    {
      field: 'description',
      error: 'required',
      message: 'Description is required.',
    },
    {
      field: 'description',
      error: 'maxlength',
      message: 'Description must not exceed 100 characters.',
    },
  ];

  fileToUpload!: File;
  imageUrl: string = '';
  filename: string = '';

  subscription: Subscription = new Subscription();
  private _snack: MatSnackBar = inject(MatSnackBar);

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateDestinationCarouselComponent>,
    private _carousel: CarouselService,
    private _auth: AuthService
  ) {}

  ngOnInit(): void {
    this.createForm = this.fb.group({
      description: new FormControl('', {
        validators: [Validators.required, Validators.maxLength(100)],
      }),
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
    carouselData.append('desc', imageData.description);
    carouselData.append('img', this.filename);
    carouselData.append('imgFile', imageData.image);
    this.subscription.add(
      this._auth.csrfToken()
        .pipe(
          switchMap(x => this._carousel.createCarouselImage('back', carouselData, x.token)),
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
