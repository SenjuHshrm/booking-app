import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-view-reservation-modal',
  templateUrl: './view-reservation-modal.component.html',
  styleUrls: ['./view-reservation-modal.component.scss']
})
export class ViewReservationModalComponent {
  public verifiedIdCard:boolean = true;
  public verifiedMobileNumber:boolean = true;
  status:any;

  constructor(
   @Inject(MAT_DIALOG_DATA) public data:any,
   public dialogRef: MatDialogRef<ViewReservationModalComponent>
 ) {}

ngOnInit(): void {
 this.status=this.data.status;
}


closeDialog(): void {
 this.dialogRef.close();
}

}
