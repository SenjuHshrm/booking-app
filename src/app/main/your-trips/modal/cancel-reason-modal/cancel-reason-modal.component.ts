import { Component, inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { FormErrorMessage } from '../../../../../../src/app/interfaces/input-error-message';
import { Subscription } from 'rxjs';
import { BookingService } from '../../../../../../src/app/services/booking.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cancel-reason-modal',
  templateUrl: './cancel-reason-modal.component.html',
  styleUrls: ['./cancel-reason-modal.component.scss'],
})
export class CancelReasonModalComponent implements OnInit {
  public isLoading: boolean = false;

  public cancelForm!: FormGroup;

  public selErrors: FormErrorMessage[] = [
    {
      field: 'selection',
      error: 'required',
      message: 'Reason is required.',
    },
  ];
  public reaErrors: FormErrorMessage[] = [
    {
      field: 'reason',
      error: 'required',
      message: 'Please specify your reason.',
    },
  ];

  private _subs: Subscription = new Subscription();
  private _snack: MatSnackBar = inject(MatSnackBar);

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CancelReasonModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _booking: BookingService
  ) {}

  ngOnInit(): void {
    this.cancelForm = this.fb.group({
      selection: new FormControl('', [Validators.required]),
      reason: new FormControl(''),
    });

    this.cancelForm.get('selection')?.valueChanges.subscribe((value) => {
      this.setReasonValidator(value);
    });
  }

  setReasonValidator(value: string) {
    const reasonControl = this.cancelForm.get('reason');
    if (value === 'Other') {
      reasonControl?.setValidators([Validators.required]);
    } else {
      reasonControl?.clearValidators();
    }
    reasonControl?.updateValueAndValidity();
  }

  onSubmit(form: FormGroup) {
    if (form.invalid) {
      form.markAllAsTouched();
      return;
    }
    const data = form.getRawValue();
    const cancelData: { reason: string; bookingId: string } = {
      reason: data.selection,
      bookingId: this.data,
    };
    if (data.selection === 'Other') cancelData.reason = data.reason;
    this.isLoading = true;
    form.disable();

    this._subs.add(
      this._booking.cancelBooking(cancelData).subscribe({
        next: () => {
          this.isLoading = false;
          form.enable();
          this._snack.open(
            `Your request for cancellation was successful. Please wait for the host's approval.`,
            '',
            {
              duration: 1000,
            }
          );
          this.closeDialog(true);
        },
        error: ({ error }) => {
          this._snack.open(
            error?.msg ||
              error?.code ||
              'Failed to request the booking cancellation.',
            '',
            { duration: 1000 }
          );
          this.isLoading = false;
          form.enable();
        },
      })
    );
  }

  closeDialog(success: boolean = false): void {
    this.dialogRef.close(success);
  }
}
