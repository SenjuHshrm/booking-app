import { AbstractControl, FormControl, Validators } from '@angular/forms';
import { FormArray, FormGroup, FormGroupDirective } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { Step1Form } from '../../register-proprietorship';


@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.scss'],
})
export class Step1Component implements OnInit {

  @Input() public formGroupName!: string;
  public formRegPropS1!: FormGroup<Step1Form>;
 
  public isChecked: any = null;
  public places: any = [
    { placetype: "Resort", value: "resort" },
    { placetype: "Private Villa", value: "appartment" },
    { placetype: "Service Condominium", value: "service condominium" },
    { placetype: "Hotel", value: "hotel" },
    { placetype: "Meeting Room", value: "meeting room" },
    { placetype: "Hotel Ballroom", value: "hotel ballroom" },
    { placetype: "Restaurant Space", value: "restaurant space" },
    { placetype: "Paviilion", value: "pavillion" },
    { placetype: "Gymnasium", value: "gymnasium" },
  ];
  public validation: any = {
    descriptionFilter: [
      {
        type: 'required',
        msg: 'Please select at least one (1) description of your place'
      }
    ]
  }

  constructor(
    public regPropFormRoot: FormGroupDirective
  ) { }

  ngOnInit(): void {
    this.formRegPropS1 = <FormGroup<Step1Form>>this.regPropFormRoot.control.get(this.formGroupName)
  }
  

  public handleSelectedPlaceType(e: Event,indexNum:any) {
    this.isChecked = (e.target as HTMLInputElement).checked;
    this.isChecked = indexNum;
    const descFilter: FormArray = <FormArray>this.formRegPropS1.get('descriptionFilter')
    let targetEl: HTMLInputElement = <HTMLInputElement>e.target!
    if(targetEl.checked) {
      descFilter.push(new FormControl(targetEl.value))
    } else{
      let i: number = 0;
      descFilter.controls.forEach((ctrl: AbstractControl) => {
        if(ctrl.value === targetEl.value) {
          descFilter.removeAt(i)
          return
        }
        i++;
      })
    }
  } 
}
