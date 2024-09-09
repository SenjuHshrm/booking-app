import { Component, inject, Inject, OnDestroy, OnInit } from '@angular/core';
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
import { ITokenClaims } from 'src/app/interfaces/token';
import { BasicUtilService } from 'src/app/services/basic-util.service';
import { StaycationService } from 'src/app/services/staycation.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-rate-and-comment',
  templateUrl: './rate-and-comment.component.html',
  styleUrls: ['./rate-and-comment.component.scss'],
})
export class RateAndCommentComponent implements OnInit, OnDestroy {
  rating: number = 0;
  hoveredRating: number = 0;
  maxRating: number = 5;
  stars: boolean[] = Array(this.maxRating).fill(false);

  publicComments: string = '';
  privateFeedback: string = '';

  isLoading: boolean = false;
  _subs: Subscription = new Subscription();
  _snack: MatSnackBar = inject(MatSnackBar);

  reviewForm!: FormGroup;
  token!: ITokenClaims;

  public ratingErrors: FormErrorMessage[] = [
    {
      field: 'rating',
      error: 'required',
      message: 'Rate the staycation from 1 to 5 stars.',
    },
  ];

  public descErrors: FormErrorMessage[] = [
    {
      field: 'desc',
      error: 'required',
      message: 'A review comment is required.',
    },
    {
      field: 'desc',
      error: 'maxlength',
      message: 'The review comment must not exceed 1000 characters.',
    },
  ];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<RateAndCommentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _token: TokenService,
    private _staycation: StaycationService
  ) {}

  ngOnInit(): void {
    this.token = <ITokenClaims>this._token.decodedToken();
    this.reviewForm = this.fb.group({
      rating: new FormControl('', {
        validators: [Validators.required],
      }),
      desc: new FormControl('', {
        validators: [Validators.required, Validators.maxLength(1000)],
      }),
    });
  }

  ngOnDestroy(): void {
    if (!this._subs) return;
    this._subs.unsubscribe();
  }

  closeDialog(success: boolean = false): void {
    if (this.isLoading) return;
    this.dialogRef.close(success);
  }

  rate(star: number): void {
    if (this.isLoading) return;
    this.rating = star;
    this.reviewForm.get('rating')?.setValue(star);
  }

  hoverRating(star: number): void {
    if (this.isLoading) return;
    this.hoveredRating = star;
  }

  onSubmit(form: FormGroup): void {
    if (form.invalid) {
      form.markAllAsTouched();
      return;
    }

    const data = form.getRawValue();

    const reviewData = new FormData();
    reviewData.append('rating', data.rating);
    reviewData.append('comment', data.desc);
    reviewData.append('user', this.token.sub);

    this.isLoading = true;
    form.disable();

    this._subs.add(
      this._staycation
        .reviewStaycation(this.data.staycationId, reviewData)
        .subscribe({
          next: (res) => {
            this.isLoading = false;
            form.enable();
            this.closeDialog(true);
          },
          error: ({ error }) => {
            this._snack.open(
              error.code || 'Failed to review staycation. Please try again.',
              '',
              { duration: 1000 }
            );
            this.isLoading = false;
            form.enable();
          },
        })
    );
  }
}
