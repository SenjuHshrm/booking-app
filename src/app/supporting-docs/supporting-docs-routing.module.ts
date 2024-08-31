import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SupportingDocsComponent } from './supporting-docs.component';

const routes: Routes = [{ path: '', component: SupportingDocsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupportingDocsRoutingModule { }
