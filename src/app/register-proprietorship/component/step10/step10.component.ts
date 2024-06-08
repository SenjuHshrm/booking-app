import { FormControl, AbstractControl } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormGroupDirective, FormArray } from '@angular/forms';
import { Step10Form } from '../../register-proprietorship';
import { fadeInAnimation } from 'src/app/globals/fadein-animations';

@Component({
  selector: 'app-step10',
  templateUrl: './step10.component.html',
  styleUrls: ['./step10.component.scss'],
  animations: [fadeInAnimation],
})
export class Step10Component implements OnInit {

  @Input() public formGroupName!: string;
  public formRegPropS10!: FormGroup<Step10Form>;
  public doesyourplace: any = [
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

  public handleSelectedSecurity(e: Event) {
    const sec: FormArray = <FormArray>this.formRegPropS10.get('security')
    let target: HTMLInputElement = <HTMLInputElement>e.target!
    if(target.checked) {
      sec.push(new FormControl(target.value))
    } else {
      let i: number = 0
      sec.controls.forEach((ctrl: AbstractControl) => {
        if(ctrl.value === target.value) {
          sec.removeAt(i)
          return
        }
        i++
      })
    }
  }
}
