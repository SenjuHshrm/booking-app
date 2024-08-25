import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentWalletSettingsRoutingModule } from './payment-wallet-settings-routing.module';
import { PaymentWalletSettingsComponent } from './payment-wallet-settings.component';
import { CreatePaymentMethodComponent } from './create-payment-method/create-payment-method.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MaskCardPipe } from './mask-card.pipe';
import { MatFormFieldModule } from '@angular/material/form-field';



@NgModule({
  declarations: [
    PaymentWalletSettingsComponent, 
    CreatePaymentMethodComponent, 
    MaskCardPipe
  ],
  imports: [
    CommonModule,
    PaymentWalletSettingsRoutingModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatMenuModule,
    MatFormFieldModule


  ]
})
export class PaymentWalletSettingsModule { }
