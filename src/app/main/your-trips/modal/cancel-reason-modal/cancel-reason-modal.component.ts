import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-cancel-reason-modal',
  templateUrl: './cancel-reason-modal.component.html',
  styleUrls: ['./cancel-reason-modal.component.scss']
})
export class CancelReasonModalComponent {
  constructor(
    public dialogRef: MatDialogRef<CancelReasonModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { }
  ) {
    
   }
  // Sample cancellation data
  cancellationData = {
    booking_id: '123ABC',
    guest: {
      guest_id: 'G987XYZ',
      guest_name: 'John Doe',
      guest_contact: 'john.doe@example.com',
      previous_cancellations: 1
    },
    property: {
      property_id: 'P456DEF',
      property_name: 'Oceanfront Villa',
      property_owner_id: 'O123VBN'
    },
    booking_details: {
      check_in_date: '2024-09-15',
      check_out_date: '2024-09-20',
      booking_total_amount: 500.00
    },
    cancellation: {
      cancellation_date: '2024-09-10T14:30:00Z',
      cancellation_reason: 'Change of plans',
      refund_amount: 150.00,
      cancellation_fee: 25.00,
      refund_eligibility: true,
      status: 'Cancelled'
    }
  };

  // Property image URL
  propertyImageUrl = '../assets/images/main/staycation-details/gallery1.png';

  // Method to format currency
  getFormattedCurrency(amount: number): string {
    return `$${amount.toFixed(2)}`;
  }

  // Method to check if refund is available
  isRefundEligible(): string {
    return this.cancellationData.cancellation.refund_eligibility ? 'Yes' : 'No';
  }


  closeDialog():void{
    this.dialogRef.close();
  }
}
