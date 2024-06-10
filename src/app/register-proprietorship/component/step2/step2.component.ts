import { FormGroup } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';
import { Step2Form } from '../../register-proprietorship';
import { fadeInAnimation } from 'src/app/globals/fadein-animations';

@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.scss'],
  animations: [fadeInAnimation],
})
export class Step2Component implements OnInit {

  @Input() public formGroupName!: string;
  public isSelected : any = null;
  public formRegPropS2!: FormGroup<Step2Form>;
  public typeofplace: any = [
    { label:"Entire place", desc:'Guest have the whole place to themselves.', value: 'event_place' },
    { label:"Shared room", desc:'Guest sleep in a room or common area that may be shared with you or others.', value: 'room_shared' },
    { label:"Room only", desc:'Guest have their own room in a home, plus access to shared spaces.', value: 'room' },
  ];
  public validation: any = {
    placeType: [
      {
        type: 'required',
        msg: 'Please select one (1) type of place'
      }
    ]
  }

  constructor(
    public regPropFormRoot: FormGroupDirective
  ) { }

  ngOnInit(): void {
    this.formRegPropS2 = <FormGroup<Step2Form>>this.regPropFormRoot.control.get(this.formGroupName)
  }

  handleRadiobtn(index:any):void{
     this.isSelected = index;
     console.log(this.isSelected);
  }
}
