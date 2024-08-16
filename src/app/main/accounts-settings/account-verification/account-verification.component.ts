import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LegalNameComponent } from './legal-name/legal-name.component';
import { PereferedNameComponent } from './perefered-name/perefered-name.component';
import { PhoneNumberComponent } from './phone-number/phone-number.component';
import { GovernmentIdComponent } from './government-id/government-id.component';

@Component({
  selector: 'app-account-verification',
  templateUrl: './account-verification.component.html',
  styleUrls: ['./account-verification.component.scss']
})
export class AccountVerificationComponent {
  constructor(
    public dialog: MatDialog,
  ) { }

  // selectedIdname:any;
  // selectIDS:any = [
  //   {idName:"Driver's License", selected:false},
  //   {idName:"Passport", selected:false},
  //   {idName:"Idetity Card", selected:false},
  // ];

  // public verifiedInfos: any = [
  //   { title: 'Legal name', subtitle: 'Make sure this matches the name on your government ID.', infoData: 'Juan Dela Cruz' },
  //   { title: 'Preferred name', subtitle: 'This is how your first name will appear to Proprietor and guests.', infoData: 'Juan Dela Cruz' },
  //   { title: 'Email address', subtitle: "Use an address you’ll always have access to.", infoData: 'juandelacruz@gmail.com' },
  //   { title: 'Phone number', subtitle: '', infoData: 9123456789 },
  //   { title: 'Government ID', subtitle: '', infoData: "Driver's License" },
  //   { title: 'Address', subtitle: '', infoData: 'San pabloc City, Laguna' },
  //   { title: 'Emergency contact', subtitle: '', infoData: 9123456789 },
  // ]

  public legalName: any = [{ firstname: 'Juan', lastname: 'Dela Cruz' }];
  public preferedName: any = 'Juan';
  public phoneNumber: any = null;
  public governmentId: any = '';


  dialogLegalName(): void {
    this.dialog.open(LegalNameComponent, {
      width: '100%',
      height: 'fit-content',
      maxHeight: 'auto',
      maxWidth: '45rem',
      data: this.legalName[0]
    });
  }



  dialogpreferedName(): void {
    this.dialog.open(PereferedNameComponent, {
      width: '100%',
      height: 'fit-content',
      maxHeight: 'auto',
      maxWidth: '45rem',
      data: this.preferedName
    });
  }


  dialogphoneNumber(): void {
    this.dialog.open(PhoneNumberComponent, {
      width: '100%',
      height: 'fit-content',
      maxHeight: 'auto',
      maxWidth: '45rem',
      data: this.phoneNumber
    });
  }

  dialoggovermentID(): void {
    this.dialog.open(GovernmentIdComponent, {
      width: '100%',
      height: 'fit-content',
      maxHeight: 'auto',
      maxWidth: '45rem',
      data: this.phoneNumber
    });
  }

}

