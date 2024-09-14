import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from './../../../../../services/auth.service';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { duration } from 'moment';
import { Subscription } from 'rxjs';
import { IFAQ } from 'src/app/interfaces/faq';
import { FormErrorMessage } from 'src/app/interfaces/input-error-message';
import { ITokenClaims } from 'src/app/interfaces/token';
import { FaqService } from 'src/app/services/faq.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-create-faq-modal',
  templateUrl: './create-faq-modal.component.html',
  styleUrls: ['./create-faq-modal.component.scss'],
})
export class CreateFaqModalComponent implements OnInit, OnDestroy {
  public createForm!: FormGroup;
  private token!: ITokenClaims;
  private subscription: Subscription = new Subscription();
  public isLoading: boolean = false;

  private _snack: MatSnackBar = inject(MatSnackBar);

  public questionErrors: FormErrorMessage[] = [
    {
      field: 'question',
      error: 'required',
      message: 'Question is required.',
    },
    {
      field: 'question',
      error: 'maxlength',
      message: 'Question must consist of 1000 characters only.',
    },
  ];

  public answerErrors: FormErrorMessage[] = [
    {
      field: 'answer',
      error: 'required',
      message: 'Answer is required.',
    },
    {
      field: 'answer',
      error: 'maxlength',
      message: 'Answer must consist of 1000 characters only.',
    },
  ];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateFaqModalComponent>,
    private _token: TokenService,
    private _faq: FaqService,
    private _auth: AuthService
  ) {}

  ngOnInit(): void {
    this.token = <ITokenClaims>this._token.decodedToken();
    this.createForm = this.fb.group({
      question: new FormControl('', {
        validators: [Validators.required, Validators.maxLength(1000)],
      }),
      answer: new FormControl('', {
        validators: [Validators.required, Validators.maxLength(1000)],
      }),
      isActive: new FormControl(false),
    });
  }

  ngOnDestroy(): void {
    if (!this.subscription) return;
    this.subscription.unsubscribe();
  }

  handleClose(success: boolean): void {
    if (this.isLoading) return;
    this.dialogRef.close({ success });
  }

  onSubmit(form: FormGroup): void {
    if (!form.valid) return;

    this.isLoading = true;
    const data = form.getRawValue();
    const fqData: IFAQ = {
      question: data.question,
      answer: data.answer,
      isActive: data.isActive,
      addedBy: this.token.sub,
    };
    this.subscription.add(
      this._auth.csrfToken()
        .pipe(
          switchMap((x) => this._faq.createFaq(fqData, x.token)),
          catchError((e) => e)
        ).subscribe({
          next: (res) => {
            this.isLoading = false;
            if (res.success === true) {
              this._snack.open('FAQ successfully created!.', '', {
                duration: 1500,
              });
              this.handleClose(true);
            }
          },
          error: (error) => {
            this.isLoading = false;
            this._snack.open(error.error.code, '', { duration: 1000 });
          },
        })
    )
  }
}
