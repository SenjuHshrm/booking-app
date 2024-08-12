import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { fadeInAnimation } from 'src/app/globals/fadein-animations';
import { MatDialog } from '@angular/material/dialog';
import { MoreInfoComponent } from './more-info/more-info.component';
import { BookingTermsComponent } from 'src/app/globals/booking-terms/booking-terms.component';
import { CancelPolicyLearnmoreComponent } from 'src/app/globals/cancel-policy-learnmore/cancel-policy-learnmore.component';

@Component({
  selector: 'app-book-staycation',
  templateUrl: './book-staycation.component.html',
  styleUrls: ['./book-staycation.component.scss'],
  animations:[fadeInAnimation]
})
export class BookStaycationComponent {
  constructor(private router: Router,public dialog: MatDialog) {}

  selectedValue: string = '';

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
    this.router.navigate(['main/staycation-details']);
  }

  onRadioChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.selectedValue = inputElement.value;
  }
  
options = [
  { label: 'Pay now', price:2500, duedate:'February 13,2024', value: '1' },
  { label: 'Pay part now, part later', price:1250, duedate:'February 30,2024', value: '2' },
];

}
