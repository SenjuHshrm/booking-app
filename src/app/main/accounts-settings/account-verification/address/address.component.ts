import { switchMap, catchError } from 'rxjs/operators';
import { AuthService } from './../../../../services/auth.service';
import { Component, inject, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BasicUtilService } from 'src/app/services/basic-util.service';
import { FormErrorMessage } from 'src/app/interfaces/input-error-message';
import {
  barangayErrors,
  cityErrors,
  countryErrors,
  provinceErrors,
  streetErrors,
  unitErrors,
  zipErrors,
} from './error.message';
import { Subscription } from 'rxjs';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';
import { ITokenClaims } from 'src/app/interfaces/token';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface AddressUpdateForm {
  unit: string;
  street: string;
  brgy: string;
  city: string;
  province: string;
  country: string;
  zip: string;
}

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
})
export class AddressComponent implements OnInit {
  public token!: ITokenClaims;
  public isLoading: boolean = false;

  public verifiedInfo: AddressUpdateForm;
  public updateForm!: FormGroup;

  public unitErrors: FormErrorMessage[] = unitErrors;
  public streetErrors: FormErrorMessage[] = streetErrors;
  public barangayErrors: FormErrorMessage[] = barangayErrors;
  public cityErrors: FormErrorMessage[] = cityErrors;
  public provinceErrors: FormErrorMessage[] = provinceErrors;
  public countryErrors: FormErrorMessage[] = countryErrors;
  public zipErrors: FormErrorMessage[] = zipErrors;

  private _sub: Subscription = new Subscription();
  private _snack: MatSnackBar = inject(MatSnackBar);

  constructor(
    private fb: FormBuilder,
    public util: BasicUtilService,
    public dialog: MatDialogRef<AddressComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddressUpdateForm,
    public _token: TokenService,
    public userService: UserService,
    private _auth: AuthService
  ) {
    this.verifiedInfo = data;
    this.token = <ITokenClaims>this._token.decodedToken();
  }

  ngOnInit(): void {
    this.updateForm = this.fb.group({
      unit: new FormControl(this.verifiedInfo.unit, [
        Validators.required,
        Validators.maxLength(20),
      ]),
      street: new FormControl(this.verifiedInfo.street, [
        Validators.required,
        Validators.maxLength(100),
      ]),
      barangay: new FormControl(this.verifiedInfo.brgy, [
        Validators.required,
        Validators.maxLength(100),
      ]),
      city: new FormControl(this.verifiedInfo.city, [
        Validators.required,
        Validators.maxLength(100),
      ]),
      province: new FormControl(this.verifiedInfo.province, [
        Validators.required,
        Validators.maxLength(100),
      ]),
      country: new FormControl(this.verifiedInfo.country, [
        Validators.required,
        Validators.maxLength(100),
      ]),
      zip: new FormControl(this.verifiedInfo.zip, [
        Validators.required,
        Validators.maxLength(10),
      ]),
    });
  }

  onSubmit(form: FormGroup): void {
    if (!form.valid) return;

    this.isLoading = true;

    const data = form.getRawValue();

    let addressData = {
      unit: data.unit,
      street: data.street,
      brgy: data.barangay,
      city: data.city,
      province: data.province,
      country: data.country,
      zip: data.zip,
      type: 'address',
    };

    const id: string = this.token.sub;
    this._sub.add(
      this._auth.csrfToken()
        .pipe(
          switchMap(x => this.userService.verificationProfileUpdate(addressData, id, x.token)),
          catchError(e => e)
        )
        .subscribe({
          next: (res) => {
            this.dialog.close({
              unit: res.profile.address.unit,
              street: res.profile.address.street,
              brgy: res.profile.address.brgy,
              city: res.profile.address.city,
              province: res.profile.address.province,
              country: res.profile.address.country,
              zip: res.profile.address.zip,
            });
          },
          error: (error: HttpErrorResponse) => {
            this._snack.open(error.error.code, '', { duration: 1000 });
          },
          complete: () => {
            this.isLoading = false;
          },
        })
    );
  }

  closeDialog(): void {
    if (this.isLoading) return;
    this.dialog.close();
  }
}
