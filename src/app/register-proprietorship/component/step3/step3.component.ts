import { FormGroup, FormGroupDirective } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { Step3Form } from '../../register-proprietorship';
import { fadeInAnimation } from './../../../globals/fadein-animations';

@Component({
  selector: 'app-step3',
  templateUrl: './step3.component.html',
  styleUrls: ['./step3.component.scss'],
  animations: [fadeInAnimation],
})
export class Step3Component implements OnInit {
  
  @Input() public formGroupName!: string;
  public formRegPropS3!: FormGroup<Step3Form>;
  public validation: any = {
    brgy: [
      {
        type: 'required',
        msg: 'Field required'
      }
    ],
    city: [
      {
        type: 'required',
        msg: 'Field required'
      }
    ],
    province: [
      {
        type: 'required',
        msg: 'Field required'
      }
    ],
    zip: [
      {
        type: 'required',
        msg: 'Field required'
      }
    ]
  }

  constructor(
    public regPropFormRoot: FormGroupDirective
  ) { }
  
  ngOnInit(): void {
    this.formRegPropS3 = <FormGroup<Step3Form>>this.regPropFormRoot.control.get(this.formGroupName)
  }
}
