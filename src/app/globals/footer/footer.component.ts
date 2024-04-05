import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})

export class FooterComponent {

  currentDate: Date; // Declare the property here

  constructor(private router: Router,) {
    this.currentDate = new Date();

  
    
  }


}
