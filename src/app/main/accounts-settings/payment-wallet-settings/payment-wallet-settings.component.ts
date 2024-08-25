import { CreatePaymentMethodComponent } from './../../accounts-settings/payment-wallet-settings/create-payment-method/create-payment-method.component';
import { MatDialog } from '@angular/material/dialog';
import { PaymentService } from './../../../services/payment.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ITokenClaims } from './../../../interfaces/token';
import { TokenService } from './../../../services/token.service';
import { Subscription } from 'rxjs';
import { UserService } from './../../../services/user.service';
import { Component, OnInit, OnDestroy } from '@angular/core';


interface Item {
  _id:number;
  cardIcon: any;
  cardName: string;
  cardNum: any;
  cardExpi: any;
  ccvNum: number;
  default:boolean
}

@Component({
  selector: 'app-payment-wallet-settings',
  templateUrl: './payment-wallet-settings.component.html',
  styleUrls: ['./payment-wallet-settings.component.scss']
})
export class PaymentWalletSettingsComponent implements OnInit, OnDestroy {

  public userPaymentMethods: any = [];

  private _t!: ITokenClaims;
  private _sub: Subscription = new Subscription();

  public cardInfo: Item[] = [
    {
      _id: 1,
      cardIcon: '../../assets/images/main/book-staycation/visa.png',
      cardName: 'Visa',
      cardNum: '4111111516982364',
      cardExpi: '04/06/2025',
      ccvNum: 123,
      default:false
    },
    {
      _id: 2,
      cardIcon: '../../assets/images/main/book-staycation/mastercard.png',
      cardName: 'Master Card',
      cardNum: '4111111516982364',
      cardExpi: '04/06/2025',
      ccvNum: 123,
      default:false
    },
    {
      _id: 3,
      cardIcon: '../../assets/images/main/book-staycation/gcash.png',
      cardName: 'Gcash',
      cardNum: '4111111516982364',
      cardExpi: '04/06/2025',
      ccvNum: 123,
      default:false
    },
    {
      _id: 4,
      cardIcon: '../../assets/images/main/book-staycation/maya.png',
      cardName: 'Maya',
      cardNum: '4111111516982364',
      cardExpi: '04/06/2025',
      ccvNum: 123,
      default:false
    }
  ];

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

  removeItemById(id: number) {
    this.cardInfo = this.cardInfo.filter(cardInfo => cardInfo._id !== id);
  }

  setDefault(index: any): void {
    this.cardInfo.forEach((card, i) => {
      card.default = i === index;
    });
  }

  public addPaymentMethod() {
    this._md.open(CreatePaymentMethodComponent, {
      width: '100%',
      maxWidth: '35rem',
      height: '35rem',
      data: this._t.sub,
    })
  }

  private _retrievePaymentMethods() {
    this._sub.add(this._payment.getUserPaymentMethod(this._t.sub).subscribe({
      next: (res: any) => {
        if (res.length > 0) {
          this.userPaymentMethods = res
        }
      },
      error: ({ error }: HttpErrorResponse) => {
        console.log(error)
      }
    }))
  }

}
