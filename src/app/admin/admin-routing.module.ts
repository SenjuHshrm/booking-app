import { adminLoginGuard } from './../guards/admin-login.guard';
import { adminGuard } from './../guards/admin.guard';
import { authResolver } from './../resolvers/auth.resolver';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { authGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule), canActivate: [adminLoginGuard] },
      { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule), canActivate: [authGuard, adminGuard], resolve: { data: authResolver } },
      { path: '', redirectTo: 'login', pathMatch: 'prefix' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
