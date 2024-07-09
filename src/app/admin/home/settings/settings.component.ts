import { Component } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  
  public validation: any = {
    tax: {
      feeName: [
        { type: 'required', msg: 'Field required' }
      ],
      price: [
        { type: 'required', msg: 'Field required' },
        { type: 'min', msg: 'Value invalid' }
      ]
    }
  }
  
}
