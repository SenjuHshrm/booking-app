import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-search-filters-addguest',
  templateUrl: './search-filters-addguest.component.html',
  styleUrls: ['./search-filters-addguest.component.scss']
})
export class SearchFiltersAddguestComponent {
  constructor(
    public dialogLogin: MatDialogRef<SearchFiltersAddguestComponent>
    ) { }
  
  dialog: any;
  closeDialogAddGuest(): void {
    this.dialogLogin.close();
  }
  
}
