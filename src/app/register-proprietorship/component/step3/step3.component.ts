import { FormGroup, FormGroupDirective } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { Step3Form } from '../../register-proprietorship';

@Component({
  selector: 'app-step3',
  templateUrl: './step3.component.html',
  styleUrls: ['./step3.component.scss']
})
export class Step3Component implements OnInit {
  
  @Input() public formGroupName!: string;
  public formRegPropS3!: FormGroup<Step3Form>;

  constructor(
    public regPropFormRoot: FormGroupDirective
  ) { }
  
  ngOnInit(): void {
    this.formRegPropS3 = <FormGroup<Step3Form>>this.regPropFormRoot.control.get(this.formGroupName)
  }
}
