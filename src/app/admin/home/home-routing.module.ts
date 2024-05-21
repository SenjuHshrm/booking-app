import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

const routes: Routes = [
  { 
    path: '',
    component: HomeComponent,
    children: [
      { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
      { path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule) },
      { path: 'global-statics', loadChildren: () => import('./global-statics/global-statics.module').then(m => m.GlobalStaticsModule) },
      { path: 'settings', loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule) },
      { path: '', redirectTo: 'dashboard', pathMatch: 'prefix' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
