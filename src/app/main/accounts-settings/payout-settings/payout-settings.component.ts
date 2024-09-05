import { MatDialog } from '@angular/material/dialog';
import { PaymentService } from './../../../services/payment.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ITokenClaims } from './../../../interfaces/token';
import { TokenService } from './../../../services/token.service';
import { Subscription } from 'rxjs';
import { UserService } from './../../../services/user.service';
import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CreatePayoutMethodComponent } from './create-payout-method/create-payout-method.component';
import { MatSnackBar } from '@angular/material/snack-bar';

interface Item {
  _id: number;
  cardIcon: any;
  cardName: string;
  cardNum: any;
  cardExpi: any;
  ccvNum: number;
  default: boolean;
}

@Component({
  selector: 'app-payout-settings',
  templateUrl: './payout-settings.component.html',
  styleUrls: ['./payout-settings.component.scss'],
})
export class PayoutSettingsComponent implements OnInit, OnDestroy {
  public userPaymentMethods: any = [];

  private _t!: ITokenClaims;
  private _sub: Subscription = new Subscription();
  private _snack: MatSnackBar = inject(MatSnackBar);

  public cardInfo: Item[] = [
    {
      _id: 1,
      cardIcon: '../../assets/images/main/account-settings/bankicon.png',
      cardName: 'Bank Account',
      cardNum: '4111111516982364',
      cardExpi: '04/06/2025',
      ccvNum: 123,
      default: false,
    },
    {
      _id: 2,
      cardIcon: '../../assets/images/main/account-settings/gcash.png',
      cardName: 'Gcash',
      cardNum: '4111111516982364',
      cardExpi: '04/06/2025',
      ccvNum: 123,
      default: false,
    },
    {
      _id: 3,
      cardIcon: '../../assets/images/main/account-settings/maya.png',
      cardName: 'Maya',
      cardNum: '4111111516982364',
      cardExpi: '04/06/2025',
      ccvNum: 123,
      default: false,
    },
  ];

  constructor(
    private _md: MatDialog,
    private _user: UserService,
    private _token: TokenService,
    private _payment: PaymentService
  ) {}

  ngOnInit(): void {
    this._t = <ITokenClaims>this._token.decodedToken();
    this._retrievePaymentMethods();
  }

  ngOnDestroy(): void {
    this._sub.unsubscribe();
  }

  removeItemById(id: number) {
    this.cardInfo = this.cardInfo.filter((cardInfo) => cardInfo._id !== id);
  }

  setDefault(index: any): void {
    this.cardInfo.forEach((card, i) => {
      card.default = i === index;
    });
  }

  public addPaymentMethod() {
    this._md.open(CreatePayoutMethodComponent, {
      width: '100%',
      maxWidth: '35rem',
      height: 'auto',
      data: this._t.sub,
    });
  }

  private _retrievePaymentMethods() {
    this._sub.add(
      this._payment.getUserPaymentMethod(this._t.sub).subscribe({
        next: (res: any) => {
          if (res.length > 0) {
            this.userPaymentMethods = res;
          }
        },
        error: ({ error }: HttpErrorResponse) => {
          this._snack.open(error.code, '', { duration: 1000 });
        },
      })
    );
  }
}
