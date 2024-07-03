import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-staycationlist-addguest-modal',
  templateUrl: './staycationlist-addguest-modal.component.html',
  styleUrls: ['./staycationlist-addguest-modal.component.scss']
})
export class StaycationlistAddguestModalComponent {

  public adults: number = 0;
  public children: number = 0;
  public infants: number = 0;
  public pets: number = 0;

  constructor(
    public dialogLogin: MatDialogRef<StaycationlistAddguestModalComponent>
    ) { }
  
  dialog: any;

  closeDialogAddGuest(): void {
    let { adults, children, infants, pets } = this;
    this.dialogLogin.close({ adults, children, infants, pets });
  }
  
}
