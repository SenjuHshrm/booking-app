import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-government-id',
  templateUrl: './government-id.component.html',
  styleUrls: ['./government-id.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class GovernmentIdComponent {
  public verifiedInfo: any;
  public govermentIdSelect: any = [
    { idName: "Driver's License" },
    { idName: 'Passport' },
    { idName: 'Idetity Card' },
  ];

  constructor(private router: Router) {}

  selectedTab: string = 'tab2';

  selectTab(tabName: string) {
    this.selectedTab = tabName;
  }
}
