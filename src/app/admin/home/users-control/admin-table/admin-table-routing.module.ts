import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminTableComponent } from './admin-table.component';

const routes: Routes = [{ path: '', component: AdminTableComponent,}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminTableRoutingModule { }
