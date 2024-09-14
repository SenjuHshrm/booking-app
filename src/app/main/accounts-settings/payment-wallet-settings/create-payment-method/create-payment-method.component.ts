import { switchMap, catchError } from 'rxjs/operators';
import { AuthService } from './../../../../services/auth.service';
import { PaymentService } from './../../../../services/payment.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-payment-method',
  templateUrl: './create-payment-method.component.html',
  styleUrls: ['./create-payment-method.component.scss']
})
export class CreatePaymentMethodComponent implements OnInit, OnDestroy {

  paymentForm: FormGroup = new FormGroup({}); // Initialize with an empty FormGroup
  bankList: string[] = ['Bank A', 'Bank B', 'Bank C']; // Example bank list
  paymentMethodName: any = [
    { id: 0, payMethod: 'Credit and Debit Card', value: 'card' },
    { id: 1, payMethod: 'Gcash', value: 'gcash' },
    // { id: 2, payMethod: 'Maya' },
  ]
  selectedType: string = 'card'
  defaultPaymentMethod: any = 'Credit and Debit Card';
  currentYear: any;
  yearRange: number[] = [];
  public piTypes: any = [{ val: "gcash", txt: "GCash" },]

  public addCardForm!: FormGroup;
  public addGCashForm!: FormGroup;



  private _sub: Subscription = new Subscription()

  constructor(
    private _md: MatDialogRef<CreatePaymentMethodComponent>,
    @Inject(MAT_DIALOG_DATA) private _userData: { email: string, userId: string },
    private _payment: PaymentService,
    private fb: FormBuilder,
    private _auth: AuthService

  ) {
    this.currentYear = new Date().getFullYear();
    this.generateYearRange(100); // Generate a range of 100 years starting from current year

  }

  ngOnInit(): void {
    this._getMerchantPaymentMethods();

    if (this.paymentMethodName && this.paymentMethodName.length > 0) {
      this.defaultPaymentMethod = 0;
    }
    // this.paymentForm = this.fb.group({
    //   paymentMethod: [this.defaultPaymentMethod, Validators.required],
    //   cardNumber: ['', [(this.defaultPaymentMethod === 0) ? Validators.required : null, Validators.minLength(16), Validators.maxLength(16), Validators.pattern('^[0-9]{16}$')]],
    //   expiryMonth: ['', (this.defaultPaymentMethod === 0) ? Validators.required : null],
    //   expiryYear: ['', (this.defaultPaymentMethod === 0) ? Validators.required : null],
    //   // expirationDate: ['', Validators.required],
    //   cvc: ['', [(this.defaultPaymentMethod === 0) ? Validators.required : null, Validators.minLength(3), Validators.maxLength(4)]],
    //   cardName: ['', [(this.defaultPaymentMethod === 0) ? Validators.required : null]],
    //   mobileNumber: ['', [(this.defaultPaymentMethod === 0) ? Validators.required : null, Validators.pattern('^[0-9]{11}$')]],
    //   accountName: ['', [(this.defaultPaymentMethod === 0) ? Validators.required : null, Validators.minLength(2)]],
    //   gcashName: ['', [(this.defaultPaymentMethod === 1) ? Validators.required : null]],
    //   gcashAcctNo: ['', [(this.defaultPaymentMethod === 1) ? Validators.required : null]]
    // });
    this.resetForms()

  }

  ngOnDestroy(): void {
    this._sub.unsubscribe()
  }

  public checkChar(e: Event): any {
    let match = new RegExp(/^[0-9]/, 'ig')
    if(!(<KeyboardEvent>e).key.match(match)) return false
  }

  public close() {
    this._md.close()
  }

  private _getMerchantPaymentMethods() {
    this._sub.add(this._payment.getMerchantPaymentMethods().subscribe({
      next: (res: any) => {
        if (res.length > 0) {
          this.piTypes = res
        }
      }
    }))
  }


  setPayMethod(selectElement: HTMLSelectElement) {
    const selectedIndex = selectElement.value;
    this.defaultPaymentMethod = this.paymentMethodName[selectedIndex].id;

  }

  generateYearRange(range: number): void {
    for (let i = 0; i < range; i++) {
      this.yearRange.push(this.currentYear + i);
    }
  }

  formatMonth(month: number): string {
    return month < 10 ? `0${month}` : `${month}`;
  }

  public resetForms() {
    this.addCardForm = this.fb.group({
      card: ['', [Validators.required, Validators.minLength(16), Validators.maxLength(16)]],
      expiryMonth: ['', [Validators.required]],
      expiryYear: ['', [Validators.required]],
      cvc: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(4)]],
      cardName: ['', [Validators.required]],
      mobileNumber: ['', [Validators.required]],
    })

    this.addGCashForm = this.fb.group({
      name: ['', [Validators.required]],
      number: ['', [Validators.required]]
    })
  }

  public onSubmit(type: string): void {
    let data: any = (type === 'card') ? this._setCardData(this.addCardForm.getRawValue()) : this._setGCashData(this.addGCashForm.getRawValue())
    this._sub.add(this._payment.createPaymentMethod(data).subscribe({
      next: (res: any) => {
        this._savePaymentMethodId(res.data.id)
      }
    }))
  }

  private _savePaymentMethodId(pmId: string) {
    this._sub.add(this._auth.csrfToken()
      .pipe(
        switchMap(x => this._payment.savePaymentMethodId({ pmId, userId: this._userData.userId }, x.token)),
        catchError(e => e)
      )
      .subscribe({
        next: (res: any) => {
          this._md.close()
        }
      }))
  }

  private _setCardData(data: any): any {
    return {
      data: {
        attributes: {
          details: {
            card_number: data.card,
            exp_month: parseInt(data.expiryMonth),
            exp_year: parseInt(data.expiryYear),
            cvc: data.cvc
          },
          billing: {
            name: data.cardName,
            phone: data.mobileNumber,
            email: this._userData.email
          },
          type: this.selectedType
        }
      }
    }
  }

  private _setGCashData(data: any): any {
    return {
      data: {
        attributes: {
          billing: {
            name: data.name,
            phone: data.number,
            email: this._userData.email
          },
          type: this.selectedType
        }
      }
    }
  }

}
