import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { fadeInAnimation } from 'src/app/globals/fadein-animations';

@Component({
  selector: 'app-book-staycation',
  templateUrl: './book-staycation.component.html',
  styleUrls: ['./book-staycation.component.scss'],
  animations:[fadeInAnimation]
})
export class BookStaycationComponent {
  constructor(private router: Router) {}

  backToBookingDetails() {
    this.router.navigate(['main/staycation-details']);
  }
}
