import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { FormErrorMessage } from 'src/app/interfaces/input-error-message';
import { BasicUtilService } from 'src/app/services/basic-util.service';

export interface EmailUpdateForm {
  email: string;
}

@Component({
  selector: 'app-email-address',
  templateUrl: './email-address.component.html',
  styleUrls: ['./email-address.component.scss'],
})
export class EmailAddressComponent {
  public verifiedInfo: string;
  public updateForm!: FormGroup;

  public emailErrors: FormErrorMessage[] = [
    {
      field: 'email',
      error: 'required',
      message: 'Email is required.',
    },
    {
      field: 'email',
      error: 'email',
      message: 'Invalid email address.',
    },
    {
      field: 'email',
      error: 'maxlength',
      message: 'Email must not exceed 100 characters.',
    },
  ];

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialogRef<EmailAddressComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    public util: BasicUtilService
  ) {
    this.verifiedInfo = data;
  }

  ngOnInit(): void {
    this.updateForm = this.fb.group({
      email: new FormControl(this.verifiedInfo, {
        validators: [
          Validators.required,
          Validators.email,
          Validators.maxLength(100),
        ],
      }),
    });
  }

  onSubmit(form: FormGroup): void {
    if (!form.valid) return;
    const data = form.getRawValue();
    this.dialog.close({
      email: data.email,
    });
  }

  closeDialog(): void {
    this.dialog.close();
  }
}
