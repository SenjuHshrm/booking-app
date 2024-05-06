import { Component } from '@angular/core';
import { fadeInAnimation } from 'src/app/globals/fadein-animations';

@Component({
  selector: 'app-pending-review',
  templateUrl: './pending-review.component.html',
  styleUrls: ['./pending-review.component.scss'],
  animations:[fadeInAnimation]
})
export class PendingReviewComponent {

}
