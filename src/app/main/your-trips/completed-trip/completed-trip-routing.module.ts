import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompletedTripComponent } from './completed-trip.component';

const routes: Routes = [{path:'', component:CompletedTripComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompletedTripRoutingModule { }
