import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StaycationListComponent } from './staycation-list.component';

const routes: Routes = [{ path: '', component: StaycationListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaycationListRoutingModule { }
