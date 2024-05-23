import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersControlComponent } from './users-control.component';

const routes: Routes = [
  { 
  path: '',
  component: UsersControlComponent,
  children: [
    { path: 'admin', loadChildren: () => import('./admin-table/admin-table.module').then(m => m.AdminTableModule) },
    { path: 'guest', loadChildren: () => import('./guest-table/guest-table.module').then(m => m.GuestTableModule) },
    { path: 'proprietor', loadChildren: () => import('./proprietor-table/proprietor-table.module').then(m => m.ProprietorTableModule) },
    { path: '', redirectTo: 'admin', pathMatch: 'prefix' }
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersControlRoutingModule { }
