import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-staycationlist-location-modal',
  templateUrl: './staycationlist-location-modal.component.html',
  styleUrls: ['./staycationlist-location-modal.component.scss']
})
export class StaycationlistLocationModalComponent {
  constructor(
    public dialogLogin: MatDialogRef<StaycationlistLocationModalComponent>
    ) { }
  
  dialog: any;
  
  closeDialogLocation(): void {
    this.dialogLogin.close();
  }
}
