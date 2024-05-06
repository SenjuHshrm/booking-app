import { Component } from '@angular/core';
import { fadeInAnimation } from 'src/app/globals/fadein-animations';

@Component({
  selector: 'app-upcoming',
  templateUrl: './upcoming.component.html',
  styleUrls: ['./upcoming.component.scss'],
  animations:[fadeInAnimation]
})
export class UpcomingComponent {

}
