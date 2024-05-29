import { FormGroup, FormGroupDirective } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { Step9Form } from '../../register-proprietorship';

@Component({
  selector: 'app-step9',
  templateUrl: './step9.component.html',
  styleUrls: ['./step9.component.scss']
})
export class Step9Component implements OnInit {

  @Input() public formGroupName!: string;
  public formRegPropS9!: FormGroup<Step9Form>;
  public adddiscounts: any = [
    { label:20, desc:'Offer 20% off your first 3 bookings' },
    { label:30, desc:'For stays of 7 nights or more' },
    { label:50, desc:'For stays of 28 nights or more' },
  ]

  constructor(
    public regPropFormRoot: FormGroupDirective
  ) { }

  ngOnInit(): void {
    this.formRegPropS9 = <FormGroup<Step9Form>>this.regPropFormRoot.control.get(this.formGroupName)
  }

}
