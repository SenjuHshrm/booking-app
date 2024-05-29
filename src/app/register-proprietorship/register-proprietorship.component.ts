import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, FormArray, FormGroupDirective } from '@angular/forms';
import {
  RegisterProprietorshipForm,
  Step1Form,
  Step2Form,
  Step3Form,
  Step4Form,
  Step5Form,
  Step6Form,
  Step7Form,
  Step8Form,
  Step9Form,
  Step10Form,
  Step11Form
} from './register-proprietorship';


@Component({
  selector: 'app-register-proprietorship',
  templateUrl: './register-proprietorship.component.html',
  styleUrls: ['./register-proprietorship.component.scss']
})
export class RegisterProprietorshipComponent implements OnInit {
  
  @ViewChild('getStarted') getStarted: ElementRef | any;
  @ViewChild('regPropFormDir') public regPropFormDir!: FormGroupDirective
  public regPropForm!: FormGroup<RegisterProprietorshipForm>

  // firstFormGroup = this._formBuilder.group({
  //   firstCtrl: ['', Validators.required],
  // });
  // secondFormGroup = this._formBuilder.group({
  //   secondCtrl: ['', Validators.required],
  // });
  isLinear = false;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.regPropForm = this._formBuilder.group<RegisterProprietorshipForm>({
      step1: this._formBuilder.group<Step1Form>({
        descriptionFilter: new FormArray<FormGroup>([], [Validators.required]),
        descriptionFilterOther: new FormControl('')
      }),
      step2: this._formBuilder.group<Step2Form>({
        placeType: new FormControl('', [Validators.required])
      }),
      step3: this._formBuilder.group<Step3Form>({
        unit: new FormControl(''),
        street: new FormControl(''),
        brgy: new FormControl(''),
        city: new FormControl(''),
        province: new FormControl(''),
        zip: new FormControl('')
      }),
      step4: this._formBuilder.group<Step4Form>({
        guests: new FormControl(''),
        bedrooms: new FormControl(''),
        beds: new FormControl(''),
        bathroom: new FormControl('')
      }),
      step5: this._formBuilder.group<Step5Form>({
        amenities: new FormControl(''),
        amenitiesOther: new FormControl('')
      }),
      step6: this._formBuilder.group<Step6Form>({
        img: new FormControl('')
      }),
      step7: this._formBuilder.group<Step7Form>({
         name: new FormControl('')
      }),
      step8: this._formBuilder.group<Step8Form>({
        descriptionText: new FormControl(''),
        descriptionTextOther: new FormControl('')
      }),
      step9: this._formBuilder.group<Step9Form>({
        discounts: new FormControl('')
      }),
      step10: this._formBuilder.group<Step10Form>({
        security: new FormControl('')
      }),
      step11: this._formBuilder.group<Step11Form>({
        price: new FormControl(''),
        beforeTax: new FormControl('')
      })
    })
  }


  public scrollToRegProp(): void {
    this.getStarted.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }

  public handleRegProp(fg: FormGroup) {
    console.log(fg.value)
  }




}
