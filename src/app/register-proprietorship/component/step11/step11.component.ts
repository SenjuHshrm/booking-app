import { FormGroup, FormGroupDirective } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { Step11Form } from '../../register-proprietorship';

@Component({
  selector: 'app-step11',
  templateUrl: './step11.component.html',
  styleUrls: ['./step11.component.scss']
})
export class Step11Component implements OnInit {

  @Input() public formGroupName!: string;
  public formRegPropS11!: FormGroup<Step11Form>;

  constructor(
    public regPropFormRoot: FormGroupDirective
  ) { }

  ngOnInit(): void {
    this.formRegPropS11 = <FormGroup<Step11Form>>this.regPropFormRoot.control.get(this.formGroupName)
  }

}
