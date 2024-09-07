import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PendingTripComponent } from './pending-trip.component';

const routes: Routes = [{path:'', component:PendingTripComponent}];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PendingTripRoutingModule { }
