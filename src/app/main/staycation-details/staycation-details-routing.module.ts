import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StaycationDetailsComponent } from './staycation-details.component';

const routes: Routes = [{ path: ':id', component: StaycationDetailsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaycationDetailsRoutingModule { }
