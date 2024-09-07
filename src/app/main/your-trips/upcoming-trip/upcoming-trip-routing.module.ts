import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpcomingTripComponent } from './upcoming-trip.component';

const routes: Routes = [{path:'', component:UpcomingTripComponent}];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpcomingTripRoutingModule { }
