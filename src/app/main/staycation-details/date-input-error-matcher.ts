import { AbstractControl, FormGroupDirective, NgForm } from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";

export class DateInputErrorMatcher implements ErrorStateMatcher {

  isErrorState(control: AbstractControl<any, any> | null, form: FormGroupDirective | NgForm | null): boolean {
    let isSubmitted = form && form.submitted
    let err = !!(control && control.invalid && (control.touched || isSubmitted))
    let parent = control?.parent
    if(!err  && parent) err = !!(parent.invalid && (control?.touched || isSubmitted))
    return err
  }

}