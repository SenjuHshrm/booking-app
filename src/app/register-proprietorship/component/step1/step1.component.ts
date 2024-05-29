import { AbstractControl, FormControl, Validators } from '@angular/forms';
import { FormArray, FormGroup, FormGroupDirective } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { Step1Form } from '../../register-proprietorship';

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.scss']
})
export class Step1Component implements OnInit {

  @Input() public formGroupName!: string;
  public formRegPropS1!: FormGroup<Step1Form>;
  public places: any = [
    { placetype: "House", value: "house" },
    { placetype: "Appartment", value: "appartment" },
    { placetype: "Villa", value: "villa" },
    { placetype: "Hotel", value: "hotel" },
    { placetype: "Guest House", value: "guest house" },
    { placetype: "Resorts", value: "resorts" },
    { placetype: "Container", value: "container" },
    { placetype: "Farm", value: "farm" },
    { placetype: "Cycladic Home", value: "cycladic home" },
    { placetype: "Casa Partiular", value: "casa partiular" },
    { placetype: "Bed & Breakfast", value: "bed and breakfast" },
    { placetype: "Boat", value: "boat" },
    { placetype: "Cabin", value: "cabin" },
    { placetype: "Barn", value: "barn" },
    { placetype: "Camper/RV", value: "camper/rv" },
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

  public handleSelectedPlaceType(e: Event) {
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
