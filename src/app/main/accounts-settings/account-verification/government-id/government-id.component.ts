import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';



@Component({
  selector: 'app-government-id',
  templateUrl: './government-id.component.html',
  styleUrls: ['./government-id.component.scss'],
  encapsulation: ViewEncapsulation.None 

})
export class GovernmentIdComponent {


  public verifiedInfo: any;
  public govermentIdSelect: any = [
    { idName: "Driver's License" },
    { idName: "Passport"},
    { idName: "Idetity Card"}
  ]

  constructor(
    private router: Router,
    public dialog: MatDialogRef<GovernmentIdComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.verifiedInfo = data;
    console.log(this.verifiedInfo)
  }
  
  selectedTab: string = 'tab1';

  selectTab(tabName: string) {
    this.selectedTab = tabName;
  }


  closeDialog(): void {
    this.dialog.close();
  }

}
