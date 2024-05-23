import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuestTableComponent } from './guest-table.component';

const routes: Routes = [{ path: '', component: GuestTableComponent,}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GuestTableRoutingModule { }
