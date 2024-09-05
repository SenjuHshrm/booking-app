import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentWalletSettingsRoutingModule } from './payment-wallet-settings-routing.module';
import { PaymentWalletSettingsComponent } from './payment-wallet-settings.component';
import { CreatePaymentMethodComponent } from './create-payment-method/create-payment-method.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { GlobalsModule } from 'src/app/globals/globals.module';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [PaymentWalletSettingsComponent, CreatePaymentMethodComponent],
  imports: [
    CommonModule,
    PaymentWalletSettingsRoutingModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatMenuModule,
    MatFormFieldModule,
    GlobalsModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
})
export class PaymentWalletSettingsModule {}
