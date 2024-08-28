import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountsSettingsRoutingModule } from './accounts-settings-routing.module';
import { AccountsSettingsComponent } from './accounts-settings.component';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    AccountsSettingsComponent


  ],
  imports: [
    CommonModule,
    AccountsSettingsRoutingModule,
    MatIconModule
  ]
})
export class AccountsSettingsModule {}
