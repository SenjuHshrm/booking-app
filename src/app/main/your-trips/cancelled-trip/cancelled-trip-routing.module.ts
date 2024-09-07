import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CancelledTripComponent } from './cancelled-trip.component';

const routes: Routes = [{path:'', component:CancelledTripComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CancelledTripRoutingModule { }
