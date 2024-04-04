import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SearchFiltersAddguestComponent } from './search-filters-modal/search-filters-addguest/search-filters-addguest.component';
import { SearchFiltersLocationsComponent } from './search-filters-modal/search-filters-locations/search-filters-locations.component';
@Component({
  selector: 'app-search-filters',
  templateUrl: './search-filters.component.html',
  styleUrls: ['./search-filters.component.scss'],
  
})
export class SearchFiltersComponent {
  constructor(public dialog: MatDialog) {}

  //Add Guest Modal Trigger
  showAddGuestModal(): void {
  const dialogRefLogin = this.dialog.open(SearchFiltersAddguestComponent, {
    panelClass: 'custom-login-modal'
  });

  dialogRefLogin.afterClosed().subscribe(() => {
    console.log('The dialog was closed');
  });
}
//Add Guest Modal Trigger

  //Add Guest Modal Trigger
  showLocationModal(): void {
    const dialogRefLogin = this.dialog.open(SearchFiltersLocationsComponent, {
      panelClass: 'custom-login-modal'
    });
  
    dialogRefLogin.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }
  //Add Guest Modal Trigger


}
