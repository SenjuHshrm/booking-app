import { FormControl, AbstractControl } from '@angular/forms';
import { FormGroup, FormGroupDirective, FormArray } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { Step8Form } from '../../register-proprietorship';
import { fadeInAnimation } from 'src/app/globals/fadein-animations';

@Component({
  selector: 'app-step8',
  templateUrl: './step8.component.html',
  styleUrls: ['./step8.component.scss'],
  animations: [fadeInAnimation],
})
export class Step8Component implements OnInit {

  @Input() public formGroupName!: string;
  public isChecked: any = null;
  public formRegPropS8!: FormGroup<Step8Form>;
  public describehouse: any = [
    { describeHouse: "Peaceful", value: 'Peaceful' },
    { describeHouse: "Unique", value: 'Unique' },
    { describeHouse: "Stylish", value: 'Stylish' },
    { describeHouse: "Peaceful", value: 'Peaceful' },
    { describeHouse: "Family-friendly", value: 'Family-friendly' },
    { describeHouse: "Spacious", value: 'Spacious' }
  ];

  constructor(
    public regPropFormRoot: FormGroupDirective
  ) { }

  ngOnInit(): void {
    this.formRegPropS8 = <FormGroup<Step8Form>>this.regPropFormRoot.control.get(this.formGroupName)
  }

  public handleSelectDesc(e: Event,indexNum:any ) {
    this.isChecked = (e.target as HTMLInputElement).checked;
    this.isChecked = indexNum;
    const desc: FormArray = <FormArray>this.formRegPropS8.get('descriptionText')
    let target: HTMLInputElement = <HTMLInputElement>e.target!
    if(target.checked) {
      desc.push(new FormControl(target.value))
    } else {
      let i: number = 0
      desc.controls.forEach((ctrl: AbstractControl) => {
        if(ctrl.value === target.value) {
          desc.removeAt(i)
          return
        }
        i++
      })
    }
  }
}
