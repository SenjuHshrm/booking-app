import { Component } from '@angular/core';
import { fadeInAnimation } from 'src/app/globals/fadein-animations';

@Component({
  selector: 'app-availability',
  templateUrl: './availability.component.html',
  styleUrls: ['./availability.component.scss'],
  animations:[fadeInAnimation]
})
export class AvailabilityComponent {

}
