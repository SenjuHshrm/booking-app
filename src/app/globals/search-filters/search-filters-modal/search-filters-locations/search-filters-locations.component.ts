import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-search-filters-locations',
  templateUrl: './search-filters-locations.component.html',
  styleUrls: ['./search-filters-locations.component.scss']
})
export class SearchFiltersLocationsComponent {
  constructor(
    public dialogLogin: MatDialogRef<SearchFiltersLocationsComponent>
    ) { }
  
  dialog: any;
  
  closeDialogLocation(): void {
    this.dialogLogin.close();
  }
}
