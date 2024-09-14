import { switchMap, catchError } from 'rxjs/operators';
import { AuthService } from './../../../../services/auth.service';
import { Component, inject, Inject, OnDestroy, OnInit } from '@angular/core';
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
import { firstNameErrors, lastNameErrors } from './error.message';
import { UserService } from 'src/app/services/user.service';
import { TokenService } from 'src/app/services/token.service';
import { ITokenClaims } from 'src/app/interfaces/token';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface NameUpdateForm {
  firstname: FormData;
  lastname: FormData;
}

@Component({
  selector: 'app-legal-name',
  templateUrl: './legal-name.component.html',
  styleUrls: ['./legal-name.component.scss'],
})
export class LegalNameComponent implements OnInit, OnDestroy {
  private token!: ITokenClaims;
  private _sub: Subscription = new Subscription();
  private _snack: MatSnackBar = inject(MatSnackBar);

  public verifiedInfo: { fName: string; lName: string };
  public updateForm!: FormGroup;

  public firstNameErrors: FormErrorMessage[] = firstNameErrors;
  public lastNameErrors: FormErrorMessage[] = lastNameErrors;

  public isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    public util: BasicUtilService,
    public dialog: MatDialogRef<LegalNameComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { fName: string; lName: string },
    private userService: UserService,
    private _token: TokenService,
    private _auth: AuthService
  ) {
    this.verifiedInfo = data;
    this.token = <ITokenClaims>this._token.decodedToken();
  }

  ngOnInit(): void {
    this.updateForm = this.fb.group({
      firstname: new FormControl(this.verifiedInfo.fName, {
        validators: [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
        ],
      }),
      lastname: new FormControl(this.verifiedInfo.lName, {
        validators: [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
        ],
      }),
    });
  }

  ngOnDestroy(): void {
    this._sub.unsubscribe();
  }

  closeDialog(): void {
    if (this.isLoading) return;
    this.dialog.close();
  }

  onSubmit(formData: FormGroup): void {
    if (!formData.valid) return;

    this.isLoading = true;

    const data = formData.getRawValue();

    let userData = {
      fName: data.firstname,
      lName: data.lastname,
      type: 'name',
    };

    const id: string = this.token.sub;
    this._sub.add(
      this._auth.csrfToken()
        .pipe(
          switchMap(x => this.userService.verificationProfileUpdate(userData, id, x.token)),
          catchError(e => e)
        )
        .subscribe({
          next: (res) => {
            this.isLoading = false;
            this.dialog.close({
              fName: res.profile.name.fName,
              lName: res.profile.name.lName,
            });
          },
          error: (error: HttpErrorResponse) => {
            this.isLoading = false;
            this._snack.open(error.error.code, '', { duration: 1000 });
          }
        })
    );
  }
}
