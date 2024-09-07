import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InProgressTripComponent } from './in-progress-trip.component';

const routes: Routes = [{path:'', component:InProgressTripComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InProgressTripRoutingModule { }
