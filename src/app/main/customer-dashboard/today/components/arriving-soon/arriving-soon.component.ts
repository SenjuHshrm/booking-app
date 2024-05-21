import { Component } from '@angular/core';
import { fadeInAnimation } from 'src/app/globals/fadein-animations';

@Component({
  selector: 'app-arriving-soon',
  templateUrl: './arriving-soon.component.html',
  styleUrls: ['./arriving-soon.component.scss'],
  animations:[fadeInAnimation]
})
export class ArrivingSoonComponent {

}
