import { FormControl, AbstractControl } from '@angular/forms';
import { FormGroup, FormGroupDirective, FormArray } from '@angular/forms';
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
    { placeamenities: "Wifi", value: 'Wifi' },
    { placeamenities: "TV", value: 'TV' },
    { placeamenities: "Kitchen", value: 'Kitchen' },
    { placeamenities: "Washer", value: 'Washer' },
    { placeamenities: "Free parking on premises", value: 'Free Parking' },
    { placeamenities: "Paid parking on premises", value: 'Paid Parking' },
    { placeamenities: "Air conditioning", value: 'Air Con' },
    { placeamenities: "Dedicated workspace", value: 'Dedicated Workspace' },
  ];

  constructor(
    public regPropFormRoot: FormGroupDirective
  ) { }

  ngOnInit(): void {
    this.formRegPropS5 = <FormGroup<Step5Form>>this.regPropFormRoot.control.get(this.formGroupName)
  }

  public handleSelectedAmenities(e: Event) {
    const amenitiesFilter: FormArray = <FormArray>this.formRegPropS5.get('amenities')
    let targetEl: HTMLInputElement = <HTMLInputElement>e.target!
    if(targetEl.checked) {
      amenitiesFilter.push(new FormControl(targetEl.value))
    } else {
      let i: number = 0;
      amenitiesFilter.controls.forEach((ctrl: AbstractControl) => {
        if(ctrl.value === targetEl.value) {
          amenitiesFilter.removeAt(i)
          return
        }
        i++
      })
    }
  }

}
