import { Step7Form } from './../../register-proprietorship';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { fadeInAnimation } from 'src/app/globals/fadein-animations';

@Component({
  selector: 'app-step7',
  templateUrl: './step7.component.html',
  styleUrls: ['./step7.component.scss'],
  animations: [fadeInAnimation],
})
export class Step7Component implements OnInit {
  
  @Input() public formGroupName!: string;
  public formRegPropS7!: FormGroup<Step7Form>;

  constructor(
    public regPropFormRoot: FormGroupDirective
  ) { }

  ngOnInit(): void {
    this.formRegPropS7 = <FormGroup<Step7Form>>this.regPropFormRoot.control.get(this.formGroupName)
  }
}
