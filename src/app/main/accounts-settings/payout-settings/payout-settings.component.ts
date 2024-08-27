import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-payout-settings',
  templateUrl: './payout-settings.component.html',
  styleUrls: ['./payout-settings.component.scss']
})
export class PayoutSettingsComponent {
  
  constructor(private fb: FormBuilder) {
    this.payoutForm = this.fb.group({
      accountName: [''],
      accountNumber: [''],
      bankName: [''],
      payoutMethod: ['bank']
    });
  }

  payoutForm: FormGroup;
  summary: any = {};


 


  getPayoutMethodName(method: string): string {
    switch (method) {
      case 'bank':
        return 'Bank Transfer';
      case 'paypal':
        return 'PayPal';
      case 'other':
        return 'Other';
      default:
        return 'Unknown';
    }
  }


  onSubmit() {
    // Update the summary with the form values
    this.summary = {
      accountName: this.payoutForm.value.accountName,
      accountNumber: this.payoutForm.value.accountNumber.replace(/.(?=.{4})/g, '*'), // Mask the account number
      bankName: this.payoutForm.value.bankName,
      payoutMethod: this.getPayoutMethodName(this.payoutForm.value.payoutMethod)
    };

}
}
