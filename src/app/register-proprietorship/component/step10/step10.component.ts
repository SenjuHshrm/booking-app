import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { Step10Form } from '../../register-proprietorship';

@Component({
  selector: 'app-step10',
  templateUrl: './step10.component.html',
  styleUrls: ['./step10.component.scss']
})
export class Step10Component implements OnInit {

  @Input() public formGroupName!: string;
  public formRegPropS10!: FormGroup<Step10Form>;
  doesyourplace:any=[
    { doesyourPlace: "Security camera’s" },
    { doesyourPlace: "Weapons" },
    { doesyourPlace: "Dangerous animals" }
  ]

  constructor(
    public regPropFormRoot: FormGroupDirective
  ) { }

  ngOnInit(): void {
    this.formRegPropS10 = <FormGroup<Step10Form>>this.regPropFormRoot.control.get(this.formGroupName)
  }
}
