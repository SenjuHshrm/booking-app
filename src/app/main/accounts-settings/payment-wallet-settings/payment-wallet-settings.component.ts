import { CreatePaymentMethodComponent } from './../../accounts-settings/payment-wallet-settings/create-payment-method/create-payment-method.component';
import { MatDialog } from '@angular/material/dialog';
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

  public userPaymentMethods: any = [];

  private _t!: ITokenClaims;
  private _sub: Subscription = new Subscription();

  constructor(
    private _md: MatDialog,
    private _user: UserService,
    private _token: TokenService,
    private _payment: PaymentService
  ) { }

  ngOnInit(): void {
    this._t = <ITokenClaims>this._token.decodedToken()
    this._retrievePaymentMethods()
  }

  ngOnDestroy(): void {
    this._sub.unsubscribe()
  }

  public addPaymentMethod() {
    this._md.open(CreatePaymentMethodComponent, {
      width: '60%',
      height: 'auto',
      data: this._t.sub
    })
  }

  private _retrievePaymentMethods() {
    this._sub.add(this._payment.getUserPaymentMethod(this._t.sub).subscribe({
      next: (res: any) => {
        if(res.length > 0) {
          this.userPaymentMethods = res
        }
      },
      error: ({ error }: HttpErrorResponse) => {
        console.log(error)
      }
    }))
  }

}
