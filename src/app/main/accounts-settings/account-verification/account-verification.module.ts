import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountVerificationRoutingModule } from './account-verification-routing.module';
import { AccountVerificationComponent } from './account-verification.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { LegalNameComponent } from './legal-name/legal-name.component';
import { PereferedNameComponent } from './perefered-name/perefered-name.component';
import { EmailAddressComponent } from './email-address/email-address.component';
import { PhoneNumberComponent } from './phone-number/phone-number.component';
import { GovernmentIdComponent } from './government-id/government-id.component';
import { AddressComponent } from './address/address.component';
import { EmergencyContactComponent } from './emergency-contact/emergency-contact.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UploadPhotoComponent } from './government-id/upload-photo/upload-photo.component';
import { CapturePhotoComponent } from './government-id/capture-photo/capture-photo.component';
import { VerificationCodeComponent } from './verification-code/verification-code.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';


@NgModule({
  declarations: [
    AccountVerificationComponent,
    LegalNameComponent,
    PereferedNameComponent,
    EmailAddressComponent,
    PhoneNumberComponent,
    GovernmentIdComponent,
    AddressComponent,
    EmergencyContactComponent,
    UploadPhotoComponent,
    CapturePhotoComponent,
    VerificationCodeComponent
  ],
  imports: [
    CommonModule,
    AccountVerificationRoutingModule,
    MatMenuModule,
    MatFormFieldModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatTabsModule
    
    
  ]
})
export class AccountVerificationModule { }
