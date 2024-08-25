import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookStaycationRoutingModule } from './book-staycation-routing.module';
import { BookStaycationComponent } from './book-staycation.component';
import { MatIconModule } from '@angular/material/icon';
import { MoreInfoComponent } from './more-info/more-info.component';
import { ProceedPaymentComponent } from './proceed-payment/proceed-payment.component';
import { PaymentDetailsComponent } from './payment-details/payment-details.component';



@NgModule({
  declarations: [
    BookStaycationComponent,
    MoreInfoComponent,
    ProceedPaymentComponent,
    PaymentDetailsComponent
  ],
  imports: [
    CommonModule,
    BookStaycationRoutingModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule
  ]
})
export class BookStaycationModule { }
