import { Step4Form } from './../../register-proprietorship';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { fadeInAnimation } from 'src/app/globals/fadein-animations';

@Component({
  selector: 'app-step4',
  templateUrl: './step4.component.html',
  styleUrls: ['./step4.component.scss'],
  animations: [fadeInAnimation],
})
export class Step4Component implements OnInit {

  @Input() public formGroupName!: string;
  public formRegPropS4!: FormGroup<Step4Form>;

  constructor(
    public regPropFormRoot: FormGroupDirective
  ) { }

  ngOnInit(): void {
    this.formRegPropS4 = <FormGroup<Step4Form>>this.regPropFormRoot.control.get(this.formGroupName)
  }
}
