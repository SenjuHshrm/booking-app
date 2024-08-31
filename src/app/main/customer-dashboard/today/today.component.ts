import { Component } from '@angular/core';

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.scss'],
})
export class TodayComponent {
  
  selectedTab: string = 'tab0';

  selectTab(tabName: string) {
    this.selectedTab = tabName;
  }
}
