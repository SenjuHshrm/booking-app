import { Component, inject, Inject, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { FormErrorMessage } from 'src/app/interfaces/input-error-message';
import { BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-add-guest',
  templateUrl: './add-guest.component.html',
  styleUrls: ['./add-guest.component.scss'],
})
export class AddGuestComponent implements OnInit, OnDestroy {
  public date: string = '';
  public time: string = '';

  public timeValue: string = '';

  public createForm!: FormGroup;

  public nameErrors: FormErrorMessage[] = [
    {
      field: 'name',
      error: 'required',
      message: 'Name is required.',
    },
    {
      field: 'name',
      error: 'maxlength',
      message: 'Name must consist of 100 characters only.',
    },
  ];

  public dateErrors: FormErrorMessage[] = [
    {
      field: 'date',
      error: 'required',
      message: 'Date is required.',
    },
    {
      field: 'date',
      error: 'maxlength',
      message: 'Date must consist of 100 characters only.',
    },
  ];

  public timeErrors: FormErrorMessage[] = [
    {
      field: 'time',
      error: 'required',
      message: 'Time is required.',
    },
    {
      field: 'time',
      error: 'maxlength',
      message: 'Time must consist of 100 characters only.',
    },
  ];

  public isLoading: boolean = false;
  private _snack: MatSnackBar = inject(MatSnackBar);
  private _sub: Subscription = new Subscription();

  constructor(
    private dialogRef: MatDialogRef<AddGuestComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private _booking: BookingService
  ) {}

  ngOnInit(): void {
    this.createForm = this.fb.group({
      name: new FormControl('', {
        validators: [Validators.required, Validators.maxLength(100)],
      }),
      date: new FormControl('', {
        validators: [Validators.required, Validators.maxLength(100)],
      }),
      time: new FormControl('', {
        validators: [Validators.required, Validators.maxLength(100)],
      }),
    });
  }

  ngOnDestroy(): void {
    if (!this._sub) return;
    this._sub.unsubscribe();
  }

  getCurrentTime(): void {
    const currentTime = moment().format('HH:mm').toString();
    this.time = moment(currentTime, 'HH:mm').format('hh:mm A');
    this.timeValue = currentTime;
  }

  getCurrentDate(): void {
    const currentDate = moment().format('MM/DD/YYYY').toString();
    this.date = currentDate;
  }

  onSubmit(form: FormGroup): void {
    if (!form.valid) {
      this.createForm.markAllAsTouched();
      return;
    }
    const data = form.getRawValue();
    const { bookingId } = this.data;
    const guestData = {
      name: data.name,
      checkInDate: data.date,
      checkInTime: this.timeValue,
    };
    this.isLoading = true;
    this._sub.add(
      this._booking.addGuest(bookingId, guestData).subscribe({
        next: (res) => {
          if (res.success) {
            this._snack.open('Guest successfully added.', '', {
              duration: 1000,
            });
            this.isLoading = false;
            this.closeDialog(res.success);
          }
        },
        error: ({ error }) => {
          this._snack.open(error.code, '', { duration: 1000 });
          this.isLoading = false;
        },
      })
    );
  }

  closeDialog(success = false): void {
    if (this.isLoading) return;
    this.dialogRef.close(success);
  }
}
