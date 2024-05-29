import { FormGroup, FormGroupDirective } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { Step8Form } from '../../register-proprietorship';

@Component({
  selector: 'app-step8',
  templateUrl: './step8.component.html',
  styleUrls: ['./step8.component.scss']
})
export class Step8Component implements OnInit {

  @Input() public formGroupName!: string;
  public formRegPropS8!: FormGroup<Step8Form>;
  public describehouse: any = [
    { describeHouse:"Peaceful" },
    { describeHouse:"Unique" },
    { describeHouse:"Stylish" },
    { describeHouse:"Peaceful" },
    { describeHouse:"Family-friendly" },
    { describeHouse:"Spacious" }
  ];

  constructor(
    public regPropFormRoot: FormGroupDirective
  ) { }

  ngOnInit(): void {
    this.formRegPropS8 = <FormGroup<Step8Form>>this.regPropFormRoot.control.get(this.formGroupName)
  }
}
