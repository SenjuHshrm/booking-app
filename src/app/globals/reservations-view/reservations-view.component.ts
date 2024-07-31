import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-reservations-view',
  templateUrl: './reservations-view.component.html',
  styleUrls: ['./reservations-view.component.scss']
})
export class ReservationsViewComponent  implements OnInit{
   
   public verifiedIdCard:boolean = true;
   public verifiedMobileNumber:boolean = true;
   titleComponent:any

   constructor(
    @Inject(MAT_DIALOG_DATA) public data:any,
    public dialogRef: MatDialogRef<ReservationsViewComponent>
  
  ) {
}
ngOnInit(): void {
  this.titleComponent=this.data;
}


closeDialog(): void {
  this.dialogRef.close();
}

}
