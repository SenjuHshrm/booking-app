import { PaymentService } from './../../../services/payment.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ITokenClaims } from './../../../interfaces/token';
import { TokenService } from './../../../services/token.service';
import { Subscription } from 'rxjs';
import { UserService } from './../../../services/user.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-payment-wallet-settings',
  templateUrl: './payment-wallet-settings.component.html',
  styleUrls: ['./payment-wallet-settings.component.scss']
})
export class PaymentWalletSettingsComponent implements OnInit, OnDestroy {

  private _t!: ITokenClaims;
  private _sub: Subscription = new Subscription();

  constructor(
    private _user: UserService,
    private _token: TokenService,
    private _payment: PaymentService
  ) { }

  ngOnInit(): void {
    this._t = <ITokenClaims>this._token.decodedToken()
    this._retrievePaymentMethods()
    this.getMerchantPaymentMethods()
  }

  ngOnDestroy(): void {
    this._sub.unsubscribe()
  }

  private _retrievePaymentMethods() {
    this._sub.add(this._payment.getUserPaymentMethod(this._t.sub).subscribe({
      next: (res: any) => {
        console.log(res)
      },
      error: ({ error }: HttpErrorResponse) => {
        console.log(error)
      }
    }))
  }

  private getMerchantPaymentMethods() {
    this._sub.add(this._payment.getMerchantPaymentMethods().subscribe({
      next: (res: any) => {
        console.log(res)
      }
    }))
  }

}
