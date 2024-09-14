import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './../../services/auth.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';
import { catchError, mergeMap, switchMap } from 'rxjs/operators';
import { ITokenClaims } from './../../interfaces/token';
import { TokenService } from './../../services/token.service';
import { ProceedPaymentComponent } from './proceed-payment/proceed-payment.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from './../../../environments/environment';
import { PaymentDetailsComponent } from './payment-details/payment-details.component';
import { PaymentService } from './../../services/payment.service';
import { BookingService } from './../../services/booking.service';
import { CancellationService } from './../../services/cancellation.service';
import { DiscountService } from './../../services/discount.service';
import { BasicUtilService } from './../../services/basic-util.service';
import { GlobalStaticService } from './../../services/global-static.service';
import { StaycationService } from './../../services/staycation.service';
import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { fadeInAnimation } from 'src/app/globals/fadein-animations';
import { MatDialog } from '@angular/material/dialog';
import { MoreInfoComponent } from './more-info/more-info.component';
import { BookingTermsComponent } from 'src/app/globals/booking-terms/booking-terms.component';
import { CancelPolicyLearnmoreComponent } from 'src/app/globals/cancel-policy-learnmore/cancel-policy-learnmore.component';
import {
  concat,
  concatWith,
  forkJoin,
  interval,
  map,
  Observable,
  of,
  take,
} from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-book-staycation',
  templateUrl: './book-staycation.component.html',
  styleUrls: ['./book-staycation.component.scss'],
  animations: [fadeInAnimation],
})
export class BookStaycationComponent implements OnInit, OnDestroy {
  public selectedValue: string = '';
  public guests: any;
  public duration: any;
  public nights: number = 0;
  public serviceCharge: number = 0;
  public totalBeforeTax: number = 0;
  public staycationDetails: any;
  public selectedCancellation: any;
  public _claims!: ITokenClaims;
  public userPaymentMethods: any = [];
  public cardInfo: any = [];
  public selectedPaymentMethod: string = '';

  public selectedPaymentType: string = '';
  // public cardPayment: any = {
  //   cardNumber: '',
  //   expiration: {
  //     month: '',
  //     year: ''
  //   },
  //   cvv: '',
  //   name: '',
  //   contact: ''
  // }
  // public gcashPayment: any = {
  //   fullName: '',
  //   acctNum: ''
  // }

  public cardPaymentForm!: FormGroup;
  public gcashPaymentForm!: FormGroup;

  public cardPaymentFormValidation: any = {
    card: [
      { type: 'required', msg: 'Card number required' },
      { type: 'maxLength', msg: 'Maximum length should be 16' },
      { type: 'luhnCheck', msg: 'Card number invalid' },
    ],
    expiryMonth: [
      { type: 'required', msg: 'Expiry Month required' },
      { type: 'max', msg: 'Maximum should be 12' },
    ],
    expiryYear: [
      { type: 'required', msg: 'Expiry Year required' },
      { type: 'max', msg: 'Maximum should be 99' },
    ],
    cvv: [
      { type: 'required', msg: 'CVV required' },
      { type: 'max', msg: 'Maximum should be 999' },
    ],
    name: [{ type: 'required', msg: 'Name on card required' }],
    contact: [{ type: 'required', msg: 'Contact number required' }],
  };

  options = [
    { label: 'Pay now', price: 2500, duedate: 'February 13,2024', value: '1' },
    {
      label: 'Pay part now, part later',
      price: 1250,
      duedate: 'February 30,2024',
      value: '2',
    },
  ];

  discount: any;

  private _snack: MatSnackBar = inject(MatSnackBar);

  constructor(
    private router: Router,
    private _activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    private _staycation: StaycationService,
    private _gs: GlobalStaticService,
    private _basicUtil: BasicUtilService,
    private _discount: DiscountService,
    private _cancellation: CancellationService,
    private _payment: PaymentService,
    private _sb: MatSnackBar,
    private _token: TokenService,
    private _fb: FormBuilder,
    private _book: BookingService,
    private _auth: AuthService
  ) {}

  ngOnInit(): void {
    this._claims = <ITokenClaims>this._token.decodedToken();
    this._activatedRoute.queryParamMap.subscribe({
      next: (v: ParamMap) => {
        this.guests = JSON.parse(<string>v.get('guests'));
        this.duration = JSON.parse(<string>v.get('duration'));
        this._calculateDuration();
        this._getStaycationDetailsAndTaxes(<string>v.get('staycationId'));
        this.selectedCancellation = JSON.parse(<string>v.get('cancellation'));

        this.initForm();

        // this._getPaymentMethod()
      },
    });
  }

  ngOnDestroy(): void {}

  public initForm() {
    this.cardPaymentForm = this._fb.group({
      card: [
        '',
        [Validators.required, Validators.maxLength(16), this._luhnValidator],
      ],
      expiryMonth: [
        '',
        [Validators.required, Validators.min(1), Validators.max(12)],
      ],
      expiryYear: [
        '',
        [Validators.required, Validators.min(1), Validators.max(99)],
      ],
      cvv: ['', [Validators.required, Validators.max(999)]],
      name: ['', Validators.required],
      contact: ['', Validators.required],
    });

    this.gcashPaymentForm = this._fb.group({
      acctName: ['', [Validators.required]],
      acctNumber: ['', [Validators.required]],
    });
  }

  onClickMore(): void {
    this.dialog.open(MoreInfoComponent, {
      width: '100%',
      maxWidth: '30rem',
    });
  }

  onClickLearnMore(): void {
    this.dialog.open(CancelPolicyLearnmoreComponent, {
      width: '100%',
      maxWidth: '32rem',
    });
  }

  onClickBookingTerms(): void {
    this.dialog.open(BookingTermsComponent, {
      width: '100%',
      height: '100%',
      maxHeight: '50rem',
      maxWidth: '50rem',
    });
  }

  backToBookingDetails() {
    this.router.navigate([
      'main/staycation-details',
      this.staycationDetails._id,
    ]);
  }

  onRadioChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.selectedValue = inputElement.value;
  }

  onSelectPaymentMethod(event: Event) {
    const inputElement = <HTMLInputElement>event.target;
    this.selectedPaymentMethod = inputElement.value;
  }

  private _initiatePaymentIntent() {
    let i = this.options.findIndex((o: any) => o.value === this.selectedValue);
    let j = this.userPaymentMethods.findIndex(
      (c: any) => c._id === this.selectedPaymentMethod
    );
    let k = this.cardInfo.findIndex(
      (x: any) => x._id === this.selectedPaymentMethod
    );
    let initPaymentIntent = {
      paymentOpt: this.selectedValue === '1' ? 'full' : 'downpayment',
      amount: this.options[i].price,
      staycationId: this.staycationDetails._id,
      paymentType: this.cardInfo[k].type,
      remainingBal: this.selectedValue === '2' ? this.options[i].price : 0,
      remainingBalDue:
        this.selectedValue === '2' ? this.options[i].duedate : '',
    };
    this._auth.csrfToken()
      .pipe(
        mergeMap((csrf) => {
          return this._payment.createPaymentIntent(initPaymentIntent, csrf.token).pipe(map((cpi) => ({ cpi, csrf })))
        }),
        switchMap((val) => {
          let att = {
            id: this.userPaymentMethods[j].pmId,
            checkInDate: moment(this.duration.start).format('MM/DD/YYYY'),
            cancellationPolicy: this.selectedCancellation.value,
            bookingProcess: this.staycationDetails.bookingProcess,
          }
          return this._payment.attachToPaymentIntent(att, val.cpi.data.id, val.csrf.token);
        }),
        catchError(e => e)
      )
      .subscribe({
        next: (res) => {
          console.log(res)
        },
        error: ({ error }: HttpErrorResponse) => {
          console.log(error)
        }
      })
  }

  public initiateBooking() {
    // this._initiatePaymentIntent()

    // if(this.staycationDetails.bookingProcess === 'for_approval') {

    // } else {
    //   // this._initiatePaymentIntent()
    // }
    // console.log(this.cardPaymentForm.getRawValue())
    let i = this.options.findIndex((o: any) => o.value === this.selectedValue);
    let data = {
      booking: {
        initiatedBy: this._claims.sub,
        bookTo: this.staycationDetails._id,
        duration: {
          start: moment(this.duration.start).format('MM/DD/YYYY'),
          end: moment(this.duration.end).format('MM/DD/YYYY')
        },
        details: this.guests,
        isCancelled: false,
        cancellationPolicy: this.selectedCancellation.value,
        status: this.staycationDetails.bookingProcess === 'instant' ? 'upcoming' : 'for_approval',
      },
      transaction: {
        userId: this._claims.sub,
        staycationId: this.staycationDetails._id,
        piId: 'temp_payment_intent_id',
        total: this.totalBeforeTax,
        paymentType: this.selectedValue === '1' ? 'full' : 'downpayment',
        history: [{
          clientKey: 'temp_client_key',
          amount: this.selectedValue === '1' ? this.totalBeforeTax : this.options[i].price,
          datePaid: moment().format('MM/DD/YYYY'),
          checkoutURL: 'temp_checkout_url'
        }],
        status: this.selectedValue === '1' ? 'paid' : 'pending',
      },
    };
    this._auth.csrfToken()
      .pipe(
        switchMap(x => this._book.tempBooking(data, x.token)),
        catchError(e => e)
      )
      .subscribe({
        next: (res: any) => {
          console.log(res);
        },
        error: ({ error }) => {
          this._snack.open(error.code, '', { duration: 1000 });
        },
      });
  }

  public checkNumberInput(e: Event): any {
    let match = new RegExp(/^[0-9]/, 'ig');
    if (!(<KeyboardEvent>e).key.match(match)) return false;
  }

  private _calculateDuration() {
    let ci = moment(this.duration.start);
    let co = moment(this.duration.end);
    this.nights = co.diff(ci, 'days');
  }

  private _getStaycationDetailsAndTaxes(id: string) {
    let staycation$ = this._staycation.getStaycationDetails(id);
    let taxes$ = this._gs.getStaticByType('service_fee');
    forkJoin([staycation$, taxes$]).subscribe(([staycation, taxes]) => {
      this.staycationDetails = {
        ...staycation,
        cover: `${environment.api}${staycation.cover}`,
      };
      this.serviceCharge =
        this._basicUtil.taxTotal(staycation.price, taxes.data) * this.nights;
      this.totalBeforeTax = parseFloat(
        (staycation.price * this.nights + this.serviceCharge).toFixed(2)
      );

      this._setDiscount();
      this._setOptions();
    });
  }

  private _setOptions() {
    let currentDate = moment(new Date());
    let checkInDay = moment(this.duration.start);
    let range = checkInDay.diff(currentDate, 'days');
    this.options = [
      {
        label: 'Pay now',
        price: this.totalBeforeTax,
        duedate: moment(new Date()).format('MMMM DD, YYYY'),
        value: '1',
      },
    ];
    if (range > 12) {
      this.options.push({
        label: 'Pay part now, pay later',
        price: parseFloat((this.totalBeforeTax * 0.5).toFixed(2)),
        duedate: checkInDay.subtract(12, 'days').format('MMMM DD, YYYY'),
        value: '2',
      });
    }
  }

  private _setDiscount() {
    let dscVal = this.staycationDetails.discounts.value;
    let i = this._discount.discounts.findIndex(
      (d: any) => this.staycationDetails.discounts.discounts === d.value
    );
    let dsc =
      this.selectedCancellation.code === '2'
        ? (dscVal + 10) / 100
        : dscVal / 100;
    this.discount = { ...this._discount.discounts[i], value: dsc };
    let discountPrice = this.totalBeforeTax * this.discount.value;
    this.totalBeforeTax = parseFloat(
      (this.totalBeforeTax - discountPrice).toFixed(2)
    );
  }

  private _luhnValidator = (): ValidatorFn => {
    return (ctl: AbstractControl) => {
      const isValid = this._luhnCheck(ctl.value);
      return isValid ? null : { luhnCheck: isValid };
    };
  };

  private _luhnCheck = (cardNumber: string): boolean => {
    if (!cardNumber.length) return false;
    cardNumber = cardNumber.replace(/\s/g, '');
    const lastDigit = Number(cardNumber[cardNumber.length - 1]);
    const reverseCardNumber = cardNumber
      .slice(0, cardNumber.length - 1)
      .split('')
      .reverse()
      .map((x) => Number(x));
    let sum = 0;
    for (let i = 0; i <= reverseCardNumber.length - 1; i += 2) {
      reverseCardNumber[i] = reverseCardNumber[i] * 2;
      if (reverseCardNumber[i] > 9) {
        reverseCardNumber[i] = reverseCardNumber[i] - 9;
      }
    }
    sum = reverseCardNumber.reduce((acc, currValue) => acc + currValue, 0);
    return (sum + lastDigit) % 10 === 0;
  };

  // private _getPaymentMethod() {
  //   this.userPaymentMethods = []
  //   this._payment.getUserPaymentMethod(this._claims.sub).subscribe({
  //     next: (res: any) => {
  //       if(res.length > 0) {
  //         res.forEach((pm: any) => {
  //           this.userPaymentMethods.push({
  //             ...pm,
  //             details: this._payment.getPaymentMethod(pm.pmId)
  //           })
  //         })
  //         this._getPMDetails()
  //       }
  //     }
  //   })
  // }

  // private _getPMDetails() {
  //   this.cardInfo = []
  //   let obs$: Observable<any>[] = this.userPaymentMethods.map((pm: any) => pm.details)
  //   forkJoin(obs$).subscribe(([...obs]) => {
  //     obs.forEach((ob: any) => {
  //       let i = this.userPaymentMethods.findIndex((pm: any) => pm.pmId === ob.data.id)
  //       let { data } = ob
  //       this.cardInfo.push({
  //         _id: this.userPaymentMethods[i]._id,
  //         type: data.attributes.type,
  //         cardIcon: (data.attributes.type === 'gcash') ? '../../assets/images/main/account-settings/gcash.png' : '../../assets/images/main/account-settings/bankicon.png',
  //         details: data.attributes.details,
  //         billing: data.attributes.billing,
  //         default: this.userPaymentMethods[i].isDefault
  //       })
  //     })
  //   })
  // }
}
