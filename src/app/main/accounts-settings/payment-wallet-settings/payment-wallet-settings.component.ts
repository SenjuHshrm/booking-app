import { switchMap, catchError } from 'rxjs/operators';
import { AuthService } from './../../../services/auth.service';
import { CreatePaymentMethodComponent } from './../../accounts-settings/payment-wallet-settings/create-payment-method/create-payment-method.component';
import { MatDialog } from '@angular/material/dialog';
import { PaymentService } from './../../../services/payment.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ITokenClaims } from './../../../interfaces/token';
import { TokenService } from './../../../services/token.service';
import { Subscription, forkJoin, Observable } from 'rxjs';
import { UserService } from './../../../services/user.service';
import { Component, OnInit, OnDestroy, inject } from '@angular/core';
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
  selector: 'app-payment-wallet-settings',
  templateUrl: './payment-wallet-settings.component.html',
  styleUrls: ['./payment-wallet-settings.component.scss'],
})
export class PaymentWalletSettingsComponent implements OnInit, OnDestroy {
  public userPaymentMethods: any = [];

  private _t!: ITokenClaims;
  private _sub: Subscription = new Subscription();
  private _snack: MatSnackBar = inject(MatSnackBar);
  private _email!: string;

  public cardInfo: any[] = [];

  constructor(
    private _md: MatDialog,
    private _user: UserService,
    private _token: TokenService,
    private _payment: PaymentService,
    private _auth: AuthService
  ) {}

  ngOnInit(): void {
    this._t = <ITokenClaims>this._token.decodedToken();
    this._retrievePaymentMethods();
    this._getUserData();
  }

  ngOnDestroy(): void {
    this._sub.unsubscribe();
  }

  removeItemById(id: string) {
    // this.cardInfo = this.cardInfo.filter(cardInfo => cardInfo._id !== id);
    this._sub.add(
      this._auth.csrfToken()
        .pipe(
          switchMap(x => this._payment.removePaymentMethod(id, x.token)),
          catchError(e => e)
        )
        .subscribe({
          next: (res: any) => {
            this.cardInfo = this.cardInfo.filter((ci: any) => ci._id !== id);
          },
        })
    );
  }

  setDefault(id: string): void {
    this._sub.add(
      this._auth.csrfToken()
        .pipe(
          switchMap(x => this._payment.setAsDefaultPaymentMethod(this._t.sub, id, x.token)),
          catchError(e => e)
        )
        .subscribe({
          next: (res: any) => {
            this.cardInfo.forEach((ci: any) => {
              ci.default = ci._id === id;
            });
          },
          error: ({ error }) => {},
        })
    );
  }

  public addPaymentMethod() {
    this._md.open(CreatePaymentMethodComponent, {
      width: '100%',
      maxWidth: '35rem',
      height: 'auto',
      data: { email: this._email, userId: this._t.sub },
    });
  }

  private _retrievePaymentMethods() {
    this.userPaymentMethods = [];
    this._sub.add(
      this._payment.getUserPaymentMethod(this._t.sub).subscribe({
        next: (res: any) => {
          if (res.length > 0) {
            res.forEach((pm: any) => {
              this.userPaymentMethods.push({
                ...pm,
                details: this._payment.getPaymentMethod(pm.pmId),
              });
            });
            this._getPaymentMethodDetails();
          }
        },
        error: ({ error }: HttpErrorResponse) => {
          this._snack.open(error.code, '', { duration: 1000 });
        },
      })
    );
  }

  private _getUserData() {
    this._sub.add(
      this._user.getUserProfile(this._t.sub).subscribe({
        next: (res: any) => {
          this._email = res.auth.email;
        },
      })
    );
  }

  private _getPaymentMethodDetails() {
    this.cardInfo = [];
    let obs$: Observable<any>[] = this.userPaymentMethods.map(
      (pm: any) => pm.details
    );
    forkJoin(obs$).subscribe(([...obs]) => {
      obs.forEach((ob: any) => {
        let i = this.userPaymentMethods.findIndex(
          (pm: any) => pm.pmId === ob.data.id
        );
        let { data } = ob;
        this.cardInfo.push({
          _id: this.userPaymentMethods[i]._id,
          type: data.attributes.type,
          cardIcon:
            data.attributes.type === 'gcash'
              ? '../../assets/images/main/account-settings/gcash.png'
              : '../../assets/images/main/account-settings/bankicon.png',
          details: data.attributes.details,
          billing: data.attributes.billing,
          default: this.userPaymentMethods[i].isDefault,
        });
      });
    });
  }
}
