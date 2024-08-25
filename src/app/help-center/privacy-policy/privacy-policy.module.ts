import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivacyPolicyRoutingModule } from './privacy-policy-routing.module';
import { NavComponent } from 'src/app/globals/nav/nav.component';
import { GlobalsModule } from 'src/app/globals/globals.module';
import { PrivacyPolicyComponent } from './privacy-policy.component';


@NgModule({
  declarations: [
    PrivacyPolicyComponent,
  ],
  imports: [
    CommonModule,
    PrivacyPolicyRoutingModule,
   
  ]
})
export class PrivacyPolicyModule { }
