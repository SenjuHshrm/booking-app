import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-staycationlist-addguest-modal',
  templateUrl: './staycationlist-addguest-modal.component.html',
  styleUrls: ['./staycationlist-addguest-modal.component.scss']
})
export class StaycationlistAddguestModalComponent {
  constructor(
    public dialogLogin: MatDialogRef<StaycationlistAddguestModalComponent>
    ) { }
  
  dialog: any;
  closeDialogAddGuest(): void {
    this.dialogLogin.close();
  }
  
}
