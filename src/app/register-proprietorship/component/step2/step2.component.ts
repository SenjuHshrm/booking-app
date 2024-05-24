import { Component } from '@angular/core';

@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.scss']
})
export class Step2Component {

  typeofplace:any=[
    {label:"Entire place", desc:'Guest have the whole place to themselves.'},
    {label:"Shared room", desc:'Guest sleep in a room or common area that may be shared with you or others.'},
    {label:"Room only", desc:'Guest have their own room in a home, plus access to shared spaces.'},
  ]

}
