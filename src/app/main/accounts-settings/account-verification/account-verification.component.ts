import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LegalNameComponent } from './legal-name/legal-name.component';
import { PereferedNameComponent } from './perefered-name/perefered-name.component';
import { PhoneNumberComponent } from './phone-number/phone-number.component';
import { GovernmentIdComponent } from './government-id/government-id.component';
import { EmailAddressComponent } from './email-address/email-address.component';
import { AddressComponent } from './address/address.component';

@Component({
  selector: 'app-account-verification',
  templateUrl: './account-verification.component.html',
  styleUrls: ['./account-verification.component.scss'],
 
})
export class AccountVerificationComponent {
  constructor(
    public dialog: MatDialog,
  ) { }

  public legalName: any = [{ firstname: 'Juan', lastname: 'Dela Cruz' }];
  
  public preferedName: any = [{ prefered: 'Juan' }];

  public emailAddress: any = [{ pemail: 'sample@gmail.com' }];

  public phoneNumber: any = [{ pnumber: 9516909360 }];

  public yourAddress: any = [
    { unit: 1707 },
    { street: 'Moon' },
    { barangay: 'Del Remedio' },
    { city: 'San Pablo City' },
    { province: 'Laguna' },
    { country: 'Philines' },
    { zip: 4000 },
  ]
  public governmentId: any = '';


  dialogLegalName(): void {

    const dialogRef = this.dialog.open(LegalNameComponent, {
      width: '100%',
      height: '100%',
      maxHeight: '22.5rem',
      maxWidth: '35rem',
      data: this.legalName[0]
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.legalName[0].firstname = result.firstname;
        this.legalName[0].lastname = result.lastname;
      }
    });
  }

  dialogpreferedName(): void {
    this.dialog.open(PereferedNameComponent, {
      width: '100%',
      height: '100%',
      maxHeight: '18rem',
      maxWidth: '35rem',
      data: this.preferedName[0]
    });
  }

  dialogemailAddress(): void {
    this.dialog.open(EmailAddressComponent, {
      width: '100%',
      height: '100%',
      maxHeight: '15rem',
      maxWidth: '35rem',
      data: this.emailAddress[0]

    });
  }

  dialogphoneNumber(): void {
    this.dialog.open(PhoneNumberComponent, {
      width: '100%',
      height: '100%',
      maxHeight: '18rem',
      maxWidth: '35rem',
      data: this.phoneNumber[0]
    });
  }

  dialogyourAddress(): void {
    this.dialog.open(AddressComponent, {
      width: '100%',
      height: '100%',
      maxHeight: '50rem',
      maxWidth: '35rem',
      data: this.yourAddress
    });
  }

  dialoggovermentID(): void {
    this.dialog.open(GovernmentIdComponent, {
      width: '100%',
      height: '100%',
      maxWidth:'55rem',
      maxHeight:'55rem',
      data: ''
    });
  }

}

