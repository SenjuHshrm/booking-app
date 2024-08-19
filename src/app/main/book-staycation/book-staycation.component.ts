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

  selectedValue: string = '';
  public guests: any;
  public duration: any;
  public nights: number = 0;
  public serviceCharge: number = 0;
  public totalBeforeTax: number = 0;
  public staycationDetails: any;

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

  constructor(
    private router: Router,
    private _activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    private _staycation: StaycationService,
    private _gs: GlobalStaticService,
    private _basicUtil: BasicUtilService
  ) {

  }

  ngOnInit(): void {
    this._activatedRoute.queryParamMap.subscribe({
      next: (v: ParamMap) => {
        this.guests = JSON.parse(<string>v.get('guests'))
        this.duration = JSON.parse(<string>v.get('duration'))
        this._calculateDuration()
        this._getStaycationDetailsAndTaxes(<string>v.get('staycationId'))
      }
    })
  }

  ngOnDestroy(): void {
    
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
      this.staycationDetails = staycation
      this.serviceCharge = this._basicUtil.taxTotal(staycation.price, taxes.data) * this.nights
      this.totalBeforeTax = (staycation.price * this.nights) + this.serviceCharge
      console.log(this.totalBeforeTax)
    })
  }

}
