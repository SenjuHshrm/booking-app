import { BasicUtilService } from './../../../services/basic-util.service';
import {
  AbstractControl,
  FormControl,
  Validators,
  ControlContainer,
  FormArray,
  FormGroup,
  FormGroupDirective
} from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { Step1Form } from '../../register-proprietorship';


@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective
    }
  ]
})
export class Step1Component implements OnInit {

  @Input() public formGroupName!: string;
  @Input() placetype: any;
  public pt: string = ''
  public formRegPropS1!: FormGroup<Step1Form>;
 
  public isCheckedStaycation: any = null;
  public isCheckedEvents: any = null;
  public places: any = [];
  public validation: any = {
    descriptionFilter: [
      {
        type: 'required',
        msg: 'Please select at least one (1) description of your place'
      }
    ]
  }

  private defaultPlaces: any = [
    { placetype: "Resort", value: "Resort", type: 'room, room_shared' },
    { placetype: "Private Villa", value: "Private Villa", type: 'room, room_shared' },
    { placetype: "Service Condominium", value: "Service Condominium", type: 'room, room_shared' },
    { placetype: "Hotel", value: "Hotel", type: 'room, room_shared' },
    { placetype: "Meeting Room", value: "Meeting Room", type: 'event_place' },
    { placetype: "Hotel Ballroom", value: "Hotel Ballroom", type: 'event_place' },
    { placetype: "Restaurant Space", value: "Restaurant Space", type: 'event_place' },
    { placetype: "Paviilion", value: "Paviilion", type: 'event_place' },
    { placetype: "Gymnasium", value: "Gymnasium", type: 'event_place' },
  ]

  constructor(
    public regPropFormRoot: FormGroupDirective,
    private _basicUtil: BasicUtilService
  ) {
    this._basicUtil.getPlaceType.subscribe(pt => {
      this.pt = pt
      // this.places = this.defaultPlaces.filter((p: any) => p.type.includes(this.pt))
      this.places = this.defaultPlaces.filter((p: any) => p.type.match(new RegExp(this.pt)))
      this.isCheckedStaycation = null
    });
    console.log("This is data" + this.places.placetype);
  }

  ngOnInit(): void {
    this.formRegPropS1 = <FormGroup<Step1Form>>this.regPropFormRoot.control.get(this.formGroupName)
  }

  public handleSelectedPlaceType(e: Event, i: number, value: string) {
    this.isCheckedStaycation = (e.target as HTMLInputElement).checked;
    this.isCheckedStaycation = i;

    this.formRegPropS1.controls['descriptionFilter'].setValue(value)
    console.log(this.formRegPropS1.controls['descriptionFilter'].value)

    // this.isCheckedEvents = (e.target as HTMLInputElement).checked;
    // this.isCheckedEvents = indexNumEvent;
    
    // const descFilter: FormArray = <FormArray>this.formRegPropS1.get('descriptionFilter')
    // let targetEl: HTMLInputElement = <HTMLInputElement>e.target!
    // if(targetEl.checked) {
    //   descFilter.push(new FormControl(targetEl.value))
    // } else{
    //   let i: number = 0;
    //   descFilter.controls.forEach((ctrl: AbstractControl) => {
    //     if(ctrl.value === targetEl.value) {
    //       descFilter.removeAt(i)
    //       return
    //     }
    //     i++;
    //   })
    // }
    // console.log(descFilter.value)

  } 
}
