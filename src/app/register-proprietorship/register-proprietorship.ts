import { FormControl, FormGroup, FormArray, AbstractControl } from "@angular/forms";

export interface RegisterProprietorshipForm {
  step1: FormGroup<Step1Form>;
  step2: FormGroup<Step2Form>;
  step3: FormGroup<Step3Form>;
  step4: FormGroup<Step4Form>;
  step5: FormGroup<Step5Form>;
  step6: FormGroup<Step6Form>;
  step7: FormGroup<Step7Form>;
  step8: FormGroup<Step8Form>;
  step9: FormGroup<Step9Form>;
  step10: FormGroup<Step10Form>;
  step11: FormGroup<Step11Form>;
}

export interface Step1Form {
  descriptionFilter: FormArray<FormGroup>;
  descriptionFilterOther: FormControl;
}

export interface Step2Form {
  placeType: any;
}

export interface Step3Form {
  unit: FormControl;
  street: FormControl;
  brgy: FormControl;
  city: FormControl;
  province: FormControl;
  zip: FormControl;
}

export interface Step4Form {
  guests: FormControl;
  bedrooms: FormControl;
  beds: FormControl;
  bathroom: FormControl;
}

export interface Step5Form {
  amenities: FormArray<FormGroup>;
  amenitiesOther: FormControl;
}

export interface Step6Form {
  img: FormControl;
}

export interface Step7Form {
  name: FormControl;
}

export interface Step8Form {
  descriptionText: FormArray<FormGroup>;
  descriptionTextOther: FormControl;
}

export interface Step9Form {
  // discounts: FormArray<FormGroup>;
  discounts: FormControl;
}

export interface Step10Form {
  security: FormArray<FormGroup>;
}

export interface Step11Form {
  price: FormControl;
  beforeTax: FormControl;
}
