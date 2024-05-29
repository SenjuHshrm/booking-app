import { FormGroup, FormGroupDirective } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { Step5Form } from '../../register-proprietorship';

@Component({
  selector: 'app-step5',
  templateUrl: './step5.component.html',
  styleUrls: ['./step5.component.scss']
})
export class Step5Component implements OnInit {
  
  @Input() public formGroupName!: string;
  public formRegPropS5!: FormGroup<Step5Form>;
  public amenities: any = [
    { placeamenities:"Wifi" },
    { placeamenities:"TV" },
    { placeamenities:"Kitchen" },
    { placeamenities:"Washer" },
    { placeamenities:"Free parking on premises" },
    { placeamenities:"Paid parking on premises" },
    { placeamenities:"Air conditioning" },
    { placeamenities:"Dedicated workspace" },
  ];

  constructor(
    public regPropFormRoot: FormGroupDirective
  ) { }

  ngOnInit(): void {
    this.formRegPropS5 = <FormGroup<Step5Form>>this.regPropFormRoot.control.get(this.formGroupName)
  }

}
