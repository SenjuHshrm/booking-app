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
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { fadeInAnimation } from 'src/app/globals/fadein-animations';
import { MatDialog } from '@angular/material/dialog';
import { MoreInfoComponent } from './more-info/more-info.component';
import { BookingTermsComponent } from 'src/app/globals/booking-terms/booking-terms.component';
import { CancelPolicyLearnmoreComponent } from 'src/app/globals/cancel-policy-learnmore/cancel-policy-learnmore.component';
import { forkJoin } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-book-staycation',
  templateUrl: './book-staycation.component.html',
  styleUrls: ['./book-staycation.component.scss'],
  animations:[fadeInAnimation]
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

  public selectedPaymentType: string = ''
  public cardPayment: any = {
    cardNumber: '',
    expiration: {
      month: '',
      year: ''
    },
    cvv: '',
    address: {
      line1: '',
      line2: '',
      city: '',
      state: '',
      country: 'PH',
      zip: ''
    },
    name: '',
    email: '',
    phone: ''
    
  }
  public gcashPayment: any = {
    fullName: '',
    acctNum: ''
  }

  onClickMore(): void {
    this.dialog.open(MoreInfoComponent, {
      width:'100%',
      maxWidth:'30rem'
    });
  }

  onClickLearnMore(): void {
    this.dialog.open(CancelPolicyLearnmoreComponent, {
      width:'100%',
      maxWidth:'32rem'
    });
  }

  onClickBookingTerms(): void {
    this.dialog.open(BookingTermsComponent, {
      width:'100%',
      height:'100%',
      maxHeight:'50rem',
      maxWidth:'50rem'
    });
  }


  backToBookingDetails() {
    this.router.navigate(['main/staycation-details', this.staycationDetails._id]);
  }

  onRadioChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.selectedValue = inputElement.value;
  }
  
  options = [
    { label: 'Pay now', price:2500, duedate:'February 13,2024', value: '1' },
    { label: 'Pay part now, part later', price:1250, duedate:'February 30,2024', value: '2' },
  ];

  discount: any;

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
    private _sb: MatSnackBar
  ) {

  }

  ngOnInit(): void {
    this._activatedRoute.queryParamMap.subscribe({
      next: (v: ParamMap) => {
        this.guests = JSON.parse(<string>v.get('guests'))
        this.duration = JSON.parse(<string>v.get('duration'))
        this._calculateDuration()
        this._getStaycationDetailsAndTaxes(<string>v.get('staycationId'))
        this.selectedCancellation = JSON.parse(<string>v.get('cancellation'))
      }
    })
  }

  ngOnDestroy(): void {
    
  }

  public initiatePaymentIntent() {
    let data: any;
    let i = this.options.findIndex((o: any) => o.value === this.selectedValue)
    data = {
      paymentOpt: (this.selectedValue === '1') ? 'full' : 'downpayment',
      price: this.options[i].price,
      secondPayment: (this.selectedValue === '2') ? this.options[i].price : 0,
      secondPaymentDue: (this.selectedValue === '2') ? this.options[i].duedate : '',
      paymentMethod: this.selectedPaymentType,
      info: (this.selectedPaymentType === 'card') ? this.cardPayment : this.gcashPayment
    }
    let initPaymentIntent = {
      paymentOpt: (this.selectedValue === '1') ? 'full' : 'downpayment',
      paymentType: this.selectedPaymentType,
      staycationId: this.staycationDetails._id,
      amount: this.options[i].price,
      remainingBal: (this.selectedValue === '2') ? this.options[i].price : 0,
      remainingBalDue: (this.selectedValue === '2') ? this.options[i].duedate : ''
    }
    this._payment.createPaymentIntent(initPaymentIntent).subscribe({
      next: (res: any) => {
        let pm = (this.selectedPaymentType === 'card') ? {
          type: this.selectedPaymentType,
          details: {
            card_number: this.cardPayment.cardNumber,
            exp_month: parseInt(this.cardPayment.expiration.month),
            exp_year: parseInt(this.cardPayment.expiration.year),
            cvc: this.cardPayment.cvv
          },
          billing: {
            address: {
              line1: this.cardPayment.address.line1,
              line2: this.cardPayment.address.line2,
              city: this.cardPayment.address.city,
              state: this.cardPayment.address.state,
              postal_code: this.cardPayment.address.zip,
              country: this.cardPayment.address.country
            },
            name: this.cardPayment.name,
            email: this.cardPayment.email,
            phone: this.cardPayment.phone
          }
        } : {
          type: this.selectedPaymentType,
          billing: {
            address: {
              line1: this.cardPayment.address.line1,
              line2: this.cardPayment.address.line2,
              city: this.cardPayment.address.city,
              state: this.cardPayment.address.state,
              postal_code: this.cardPayment.address.zip,
              country: this.cardPayment.address.country
            },
            name: this.cardPayment.name,
            email: this.cardPayment.email,
            phone: this.cardPayment.phone
          }
        }
        this._payment.createPaymentMethod({ data: { attributes: pm } }).subscribe({
          next: (resp: any) => {
            console.log(resp)
            let att = {
              id: resp.data.id,
              checkInDate: moment(this.duration.start).format('MM/DD/YYYY'),
              cancellationPolicy: this.selectedCancellation.value,
              bookingProcess: this.staycationDetails.bookingProcess
            }
            this._payment.attachToPaymentIntent(att, res.data.id).subscribe({
              next: (y: any) => {
                switch(this.staycationDetails.bookingProcess) {
                  case "for_approval":
                    this._sb.open('Booking requested sucessfully', 'OK', { duration: 2500 })
                    this.router.navigate(['/main'])
                    break;
                  case "instant":
                    this.dialog.open(ProceedPaymentComponent, {
                      width: '90vw',
                      height: '90vh',
                      data: y.data.attributes,
                      disableClose: true
                    })
                    break;
                }
              }
            })
          }
        })
      },
      error: ({ error }) => {
        console.log(error)
      }
    })
  }

  private _calculateDuration() {
    let ci = moment(this.duration.start)
    let co = moment(this.duration.end)
    this.nights = co.diff(ci, 'days')
  }

  private _getStaycationDetailsAndTaxes(id: string) {
    let staycation$ = this._staycation.getStaycationDetails(id)
    let taxes$ = this._gs.getStaticByType('service_fee')
    forkJoin([staycation$, taxes$]).subscribe(([staycation, taxes]) => {
      this.staycationDetails = { ...staycation, cover: `${environment.api}${staycation.cover}` }
      this.serviceCharge = this._basicUtil.taxTotal(staycation.price, taxes.data) * this.nights
      this.totalBeforeTax = (staycation.price * this.nights) + this.serviceCharge
      
      this._setDiscount()
      this._setOptions()
    })
  }

  private _setOptions() {
    let currentDate = moment(new Date())
    let checkInDay = moment(this.duration.start);
    let range = checkInDay.diff(currentDate, 'days')
    this.options = [
      { label: 'Pay now', price: this.totalBeforeTax, duedate: moment(new Date).format('MMMM DD, YYYY'), value: '1' }
    ]
    if(range > 12) {
      this.options.push({
        label: 'Pay part now, pay later',
        price: this.totalBeforeTax * .5,
        duedate: checkInDay.subtract(12, 'days').format('MMMM DD, YYYY'),
        value: '2'
      })
    }
  }

  private _setDiscount() {
    let dscVal = this.staycationDetails.discounts.value
    let i = this._discount.discounts.findIndex((d: any) => this.staycationDetails.discounts.discounts === d.value)
    let dsc = (this.selectedCancellation.code === '2') ? (dscVal + 10) / 100 : dscVal / 100;
    this.discount = { ...this._discount.discounts[i], value: dsc }
    let discountPrice = this.totalBeforeTax * this.discount.value
    this.totalBeforeTax = this.totalBeforeTax - discountPrice
  }

}
