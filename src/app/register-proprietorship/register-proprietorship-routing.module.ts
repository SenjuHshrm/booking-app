import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterProprietorshipComponent } from './register-proprietorship.component';

const routes: Routes = [{ path: '', component: RegisterProprietorshipComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterProprietorshipRoutingModule { }
