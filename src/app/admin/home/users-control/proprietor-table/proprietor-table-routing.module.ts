import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProprietorTableComponent } from './proprietor-table.component';

const routes: Routes = [{ path: '', component: ProprietorTableComponent,}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProprietorTableRoutingModule { }
