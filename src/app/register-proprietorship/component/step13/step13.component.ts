import { FormGroupDirective, ControlContainer, FormArray, FormControl, FormGroup, AbstractControl } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-step13',
  templateUrl: './step13.component.html',
  styleUrls: ['./step13.component.scss'],
  providers: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective
    }
  ]
})
export class Step13Component implements OnInit {

  @Input() public formGroupName!: string;
  public isChecked: any = null;
  public formRegPropS13!: FormGroup;

  constructor(
    public regPropFormRoot: FormGroupDirective
  ) { }

  ngOnInit(): void {
    this.formRegPropS13 = <FormGroup>this.regPropFormRoot.control.get(this.formGroupName)
  }

  toggleSwitch(){

  }


  houseRulesData:any = [
    {title:'Suitable for children (2-12 years)', selected:true},
    {title:'Suitable for infants (under 2 years)', selected:true},
    {title:'Pets', selected:true},
    {title:'No Smoking', selected:true},
    {title:'No events or party', selected:true},
  ]

  public textValue: string = '';

  addCheckBox() {
    // this.houseRulesData.push({title:this.textValue, selected: true});

    if (this.textValue.trim() !== '') {
      this.houseRulesData.push({ title: this.textValue, selected: true });
    }
    this.textValue = ''; 
  }

  public handleSelectedRules(e: Event, i: number) {
    this.isChecked = (e.target as HTMLInputElement).checked;
    this.isChecked = i;
    const rulesFilter: FormArray =  <FormArray>this.formRegPropS13.get('houseRules')
    let targetEl: HTMLInputElement = <HTMLInputElement>e.target!
    if(targetEl.checked) {
      rulesFilter.push(new FormControl(targetEl.value))
    } else {
      let n: number = 0;
      rulesFilter.controls.forEach((ctl: AbstractControl) => {
        if(ctl.value === targetEl.value) {
          rulesFilter.removeAt(i)
          return
        }
        i++
      })
    }
  }
}
