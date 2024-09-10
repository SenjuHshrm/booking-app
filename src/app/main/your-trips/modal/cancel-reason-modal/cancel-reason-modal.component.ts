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
  selectedReason: string = '';
  otherReason: string = '';
  
  constructor(
    public dialogRef: MatDialogRef<CancelReasonModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { }
  ) {
    
   }

 
   onSubmit() {
     if (this.selectedReason === 'Other' && !this.otherReason) {
       console.log('Please provide a reason.');
     } else {
       console.log('Form Submitted');
       console.log('Reason:', this.selectedReason);
       if (this.selectedReason === 'Other') {
         console.log('Other reason:', this.otherReason);
       }
     }
   }

  closeDialog():void{
    this.dialogRef.close();
  }
}
