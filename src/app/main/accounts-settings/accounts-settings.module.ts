import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountsSettingsRoutingModule } from './accounts-settings-routing.module';
import { AccountsSettingsComponent } from './accounts-settings.component';


@NgModule({
  declarations: [
    AccountsSettingsComponent

  ],
  imports: [
    CommonModule,
    AccountsSettingsRoutingModule,
  ]
})
export class AccountsSettingsModule { }
