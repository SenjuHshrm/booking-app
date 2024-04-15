import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountsSettingsComponent } from './accounts-settings.component';

const routes: Routes = [
  {
    path:'',
    component:AccountsSettingsComponent,
    children: [
      {
        path: 'security-settings',
        loadChildren: () => import('./security-settings/security-settings.module').then(m => m.SecuritySettingsModule),
        title: 'TaraGo | Today'
      },
      {
        path: 'payment-wallet-settings',
        loadChildren: () => import('./payment-wallet-settings/payment-wallet-settings.module').then(m => m.PaymentWalletSettingsModule),
        title: 'TaraGo | Calendar'
      },
      {
        path: '',
        redirectTo: 'security-settings',
        pathMatch: 'prefix'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountsSettingsRoutingModule { }
