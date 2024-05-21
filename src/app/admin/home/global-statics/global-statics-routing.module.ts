import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GlobalStaticsComponent } from './global-statics.component';

const routes: Routes = [{ path: '', component: GlobalStaticsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GlobalStaticsRoutingModule { }
