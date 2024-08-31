import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListingApplicationComponent } from './listing-application.component';

const routes: Routes = [{ path: '', component: ListingApplicationComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListingApplicationRoutingModule { }
