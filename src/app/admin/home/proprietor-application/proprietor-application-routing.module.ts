import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProprietorApplicationComponent } from './proprietor-application.component';

const routes: Routes = [{ path: '', component: ProprietorApplicationComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProprietorApplicationRoutingModule { }
