import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentWalletSettingsComponent } from './payment-wallet-settings.component';

const routes: Routes = [
  {path:'',component:PaymentWalletSettingsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentWalletSettingsRoutingModule { }
