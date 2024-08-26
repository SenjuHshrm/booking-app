import {
  Component,
  EventEmitter,
  Inject,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-government-id',
  templateUrl: './government-id.component.html',
  styleUrls: ['./government-id.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class GovernmentIdComponent {
  @Output() setNewStatus = new EventEmitter<string>();
  public isLoading = false;

  public verifiedInfo: any;
  public govermentIdSelect: any = [
    { idName: "Driver's License" },
    { idName: 'Passport' },
    { idName: 'Idetity Card' },
  ];

  constructor(private router: Router) {}

  selectedTab: string = 'tab1';

  selectTab(tabName: string) {
    if (this.isLoading) return;
    this.selectedTab = tabName;
  }

  handleSetLoading(isLoading: boolean): void {
    this.isLoading = isLoading;
  }

  handleSetNewStatus(status: string): void {
    this.setNewStatus.emit(status);
  }
}
