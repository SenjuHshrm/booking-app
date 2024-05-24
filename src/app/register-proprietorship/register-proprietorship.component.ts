import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';


@Component({
  selector: 'app-register-proprietorship',
  templateUrl: './register-proprietorship.component.html',
  styleUrls: ['./register-proprietorship.component.scss']
})
export class RegisterProprietorshipComponent {
@ViewChild('getStarted') getStarted: ElementRef | any;

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;

  constructor(private _formBuilder: FormBuilder) {}


  scrollToRegProp(): void {
    this.getStarted.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }




}
