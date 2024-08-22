import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LegalNameComponent } from './legal-name/legal-name.component';
import { PereferedNameComponent } from './perefered-name/perefered-name.component';
import { PhoneNumberComponent } from './phone-number/phone-number.component';
import { GovernmentIdComponent } from './government-id/government-id.component';
import { EmailAddressComponent } from './email-address/email-address.component';
import {
  AddressComponent,
  AddressUpdateForm,
} from './address/address.component';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ITokenClaims } from 'src/app/interfaces/token';
import { BasicUtilService } from 'src/app/services/basic-util.service';

export interface LegalName {
  fName: string;
  lName: string;
}

export interface Address {
  unit?: string;
  street?: string;
  brgy?: string;
  city?: string;
  province?: string;
  country?: string;
  zip?: string;
}

@Component({
  selector: 'app-account-verification',
  templateUrl: './account-verification.component.html',
  styleUrls: ['./account-verification.component.scss'],
})
export class AccountVerificationComponent implements OnInit {
  public legalName: LegalName = { fName: '', lName: '' };
  public preferedName: string = '';
  public emailAddress: string = '';
  public phoneNumber: string = '';
  public address: Address = {
    unit: '',
    street: '',
    brgy: '',
    city: '',
    province: '',
    country: '',
    zip: '',
  };
  private token: ITokenClaims;

  public governmentId: string = '';

  private _sub: Subscription = new Subscription();

  constructor(
    public dialog: MatDialog,
    private _token: TokenService,
    private _user: UserService,
    public util: BasicUtilService
  ) {
    this.token = <ITokenClaims>this._token.decodedToken();
    this._getUserProfile(this.token.sub);
  }

  ngOnInit(): void {}

  private _getUserProfile(id: string) {
    this._sub.add(
      this._user.getUserProfile(id).subscribe({
        next: (res: any) => {
          const { name, address, contact } = res.profile ?? {};
          const { email } = res.auth;

          this.legalName = {
            fName: name.fName,
            lName: name.lName,
          };

          this.emailAddress = email;

          this.phoneNumber = contact;
          console.log(address);
          if (address) {
            this.address = {
              unit: address.unit,
              street: address.street,
              brgy: address.brgy,
              city: address.city,
              province: address.province,
              country: address.country,
              zip: address.zip,
            };
          }
        },
        error: ({ error }: HttpErrorResponse) => {
          console.log(error);
        },
      })
    );
  }

  ngOnDestroy(): void {
    this._sub.unsubscribe();
  }

  dialogLegalName(): void {
    const dialogRef = this.dialog.open(LegalNameComponent, {
      width: '100%',
      height: '100%',
      maxHeight: '22.5rem',
      maxWidth: '35rem',
      data: this.legalName,
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.legalName.fName = result.fName;
        this.legalName.lName = result.lName;
      }
    });
  }

  dialogpreferedName(): void {
    this.dialog.open(PereferedNameComponent, {
      width: '100%',
      height: '100%',
      maxHeight: '18rem',
      maxWidth: '35rem',
      data: this.preferedName,
    });
  }

  dialogemailAddress(): void {
    const dialogRef = this.dialog.open(EmailAddressComponent, {
      width: '100%',
      height: '100%',
      maxHeight: '15rem',
      maxWidth: '35rem',
      data: this.emailAddress,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.legalName.fName = result.fName;
        this.legalName.lName = result.lName;
      }
    });
  }

  dialogphoneNumber(): void {
    this.dialog.open(PhoneNumberComponent, {
      width: '100%',
      height: '100%',
      maxHeight: '18rem',
      maxWidth: '35rem',
      data: this.phoneNumber,
    });
  }

  dialogyourAddress(): void {
    const dialogRef = this.dialog.open(AddressComponent, {
      width: '100%',
      height: '100%',
      maxHeight: '50rem',
      maxWidth: '35rem',
      data: this.address,
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.address = {
          unit: result.unit,
          street: result.street,
          brgy: result.brgy,
          city: result.city,
          province: result.province,
          country: result.country,
          zip: result.zip,
        };
      }
    });
  }

  dialoggovermentID(): void {
    this.dialog.open(GovernmentIdComponent, {
      width: '100%',
      height: '100%',
      maxWidth: '55rem',
      maxHeight: '55rem',
      data: '',
    });
  }

  addressHaveValue(data: Address): boolean {
    return Object.values(data).every(
      (item) => item !== '' && item !== null && item !== undefined
    );
  }

  get nickNameBtnText(): string {
    return this.preferedName ? `Edit` : 'Add';
  }

  get nickNameTextValue(): string {
    return this.preferedName ? this.preferedName : 'Not Provided';
  }

  get emailBtnText(): string {
    return this.emailAddress ? `Edit` : 'Add';
  }

  get emailTextValue(): string {
    return this.emailAddress ? this.emailAddress : 'Not Provided';
  }

  get contactClass(): string {
    return this.phoneNumber ? 'verify_value' : 'custom_subtitle_number';
  }

  get contactBtnText(): string {
    return this.phoneNumber ? `Edit` : 'Add';
  }

  get contactTextValue(): string {
    return this.phoneNumber
      ? `+63${this.phoneNumber}`
      : 'Add a number so confirmed guests and TaraGo can get in touch. You can add other numbers and choose how they’re used.';
  }

  get nameBtnText(): string {
    const { fName, lName } = this.legalName;
    return fName && lName ? `Edit` : 'Add';
  }

  get nameTextValue(): string {
    const { fName, lName } = this.legalName;
    return fName && lName ? `${fName} ${lName}` : 'Not Provided';
  }

  get addressBtnText(): string {
    return this.addressHaveValue(this.address) ? 'Edit' : 'Add';
  }

  get addressTextValue(): string {
    return this.addressHaveValue(this.address) === true
      ? this.util.constructAddress(this.address)
      : 'Not Provided';
  }

  get govIdBtnText(): string {
    return this.governmentId ? 'Edit' : 'Add';
  }

  get govIdTextValue(): string {
    return this.governmentId ? this.governmentId : 'Not Provided';
  }
}
