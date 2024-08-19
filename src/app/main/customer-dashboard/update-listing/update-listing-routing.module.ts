import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateListingComponent } from './update-listing.component';

const routes: Routes = [{ path: '', component: UpdateListingComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpdateListingRoutingModule { }
