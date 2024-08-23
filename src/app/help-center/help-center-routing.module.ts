import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HelpCenterComponent } from './help-center.component';

const routes: Routes = [{
  path: '',
  component: HelpCenterComponent,
  children: [
    {
      path: 'privacy-policy',
      loadChildren: () => import('./privacy-policy/privacy-policy.module').then(m => m.PrivacyPolicyModule),
      title: 'TaraGo | Staycations'
    },
    {
      path: 'terms-of-service',
      loadChildren: () => import('./privacy-policy/privacy-policy.module').then(m => m.PrivacyPolicyModule),
      title: 'TaraGo | Staycations'
    },
    

  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HelpCenterRoutingModule { }
