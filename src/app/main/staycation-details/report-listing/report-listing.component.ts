import { switchMap, catchError } from 'rxjs/operators';
import { AuthService } from './../../../services/auth.service';
import { Component, inject, Inject, OnInit } from '@angular/core';
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
import { IReport } from 'src/app/interfaces/report';
import { ITokenClaims } from 'src/app/interfaces/token';
import { ReportService } from 'src/app/services/report.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-report-listing',
  templateUrl: './report-listing.component.html',
  styleUrls: ['./report-listing.component.scss'],
})
export class ReportListingComponent implements OnInit {
  isLoading: boolean = false;

  createForm!: FormGroup;

  subscription: Subscription = new Subscription();

  public reportErrors: FormErrorMessage[] = [
    {
      field: 'description',
      error: 'required',
      message: 'Report description is required.',
    },
    {
      field: 'description',
      error: 'maxlength',
      message:
        'Report description must consist of maximum of 1000 characters only.',
    },
  ];

  public token!: ITokenClaims;
  private _snack: MatSnackBar = inject(MatSnackBar);

  constructor(
    private dialogRef: MatDialogRef<ReportListingComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _token: TokenService,
    private _report: ReportService,
    private _auth: AuthService
  ) {}

  ngOnInit(): void {
    this.token = <ITokenClaims>this._token.decodedToken();
    this.createForm = this.fb.group({
      description: new FormControl('', {
        validators: [Validators.required, Validators.maxLength(1000)],
      }),
    });
  }

  handleClose(success: boolean): void {
    if (this.isLoading) return;
    this.dialogRef.close({ success });
  }

  onSubmit(form: FormGroup): void {
    if (!form.valid) return;
    const formData = form.getRawValue();
    const reportData: IReport = {
      reporter: this.token.sub,
      reported: this.data.host._id,
      msg: formData.description,
      action: 'no-action',
    };
    this.isLoading = true;
    this.subscription.add(
      this._auth.csrfToken()
      .pipe(
        switchMap(x => this._report.sendReport(reportData, x.token)),
        catchError(e => e)
      )
      .subscribe({
        next: (res) => {
          console.log('NEXT: ', res);
          this.isLoading = false;
          console.log(this.isLoading);
          this.handleClose(true);
          this._snack.open(
            'Thank you for reporting this issue. We appreciate your effort in helping us keep our platform safe and trustworthy.',
            '',
            {
              duration: 1500,
            }
          );
        },
        error: (error) => {
          this.isLoading = false;
        },
      })
    );
  }
}
