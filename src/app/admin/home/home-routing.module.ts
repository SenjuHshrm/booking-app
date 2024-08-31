import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

const routes: Routes = [
  { 
    path: '',
    component: HomeComponent,
    children: [
      { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
      { path: 'user-control', loadChildren: () => import('./users-control/users-control.module').then(m => m.UsersControlModule) },
      { path: 'identification', loadChildren: () => import('./identification/identification.module').then(m => m.IdentificationModule) },
      { path: 'reports', loadChildren: () => import('./report/report.module').then(m => m.ReportModule) },
      { path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule) },
      { path: 'global-statics', loadChildren: () => import('./global-statics/global-statics.module').then(m => m.GlobalStaticsModule) },
      { path: 'settings', loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule) },
      { path: 'proprietor-application', loadChildren: () => import('./proprietor-application/proprietor-application.module').then(m => m.ProprietorApplicationModule) },
      { path: 'listing-application', loadChildren: () => import('./listing-application/listing-application.module').then(m => m.ListingApplicationModule) },
      { path: '', redirectTo: 'dashboard', pathMatch: 'prefix' }
    ]
  },
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
