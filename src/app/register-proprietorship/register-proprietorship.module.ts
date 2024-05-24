import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterProprietorshipRoutingModule } from './register-proprietorship-routing.module';
import { RegisterProprietorshipComponent } from './register-proprietorship.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Step1Component } from './component/step1/step1.component';
import { Step2Component } from './component/step2/step2.component';
import { Step3Component } from './component/step3/step3.component';
import { Step4Component } from './component/step4/step4.component';
import { Step5Component } from './component/step5/step5.component';
import { Step6Component } from './component/step6/step6.component';
import { Step7Component } from './component/step7/step7.component';
import { Step8Component } from './component/step8/step8.component';
import { Step9Component } from './component/step9/step9.component';
import { Step10Component } from './component/step10/step10.component';
import { Step11Component } from './component/step11/step11.component';
import { Step12Component } from './component/step12/step12.component';
import { Step13Component } from './component/step13/step13.component';
import { GlobalsModule } from '../globals/globals.module';
import {MatRippleModule} from '@angular/material/core';

@NgModule({
  declarations: [
    RegisterProprietorshipComponent,
    Step1Component,
    Step2Component,
    Step3Component,
    Step4Component,
    Step5Component,
    Step6Component,
    Step7Component,
    Step8Component,
    Step9Component,
    Step10Component,
    Step11Component,
    Step12Component,
    Step13Component
  ],
  imports: [
    CommonModule,
    RegisterProprietorshipRoutingModule,
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatStepperModule,
    GlobalsModule,
    MatRippleModule
  ]
})
export class RegisterProprietorshipModule { }
