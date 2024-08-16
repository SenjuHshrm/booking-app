import { BasicUtilService } from './../services/basic-util.service';
import { StaycationService } from './../services/staycation.service';
import { Subscription } from 'rxjs';
import { ITokenClaims } from './../interfaces/token';
import { TokenService } from './../services/token.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, ElementRef, ViewChild, OnInit, AfterViewInit, ChangeDetectorRef, OnDestroy, ViewEncapsulation } from '@angular/core';
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
  Step11Form,
  Step12Form,
  Step13Form,
  Step14Form
} from './register-proprietorship';
import { fadeInAnimation } from '../globals/fadein-animations';
import { Location } from '@angular/common';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-register-proprietorship',
  templateUrl: './register-proprietorship.component.html',
  styleUrls: ['./register-proprietorship.component.scss'],
  encapsulation: ViewEncapsulation.None ,
  animations: [fadeInAnimation],
})
export class RegisterProprietorshipComponent implements OnInit, AfterViewInit, OnDestroy {
  
  @ViewChild('getStarted') getStarted: ElementRef | any;
  @ViewChild('regPropFormDir') public regPropFormDir!: FormGroupDirective
  public regPropForm!: FormGroup<RegisterProprietorshipForm>;

  public isLinear = false;
  public isAuth!: boolean;
  public isHiddenintro = false;
  public isHiddenstepper = true;

  public showProgress: boolean = false;
  public uploadProgress: number = 0;
  private _cover!: File | null;
  private _tokenClaims!: ITokenClaims;
  private sub: Subscription = new Subscription()

  constructor(
    private router: Router,
    private location: Location,
    private _formBuilder: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private _changeDetector: ChangeDetectorRef,
    private _token: TokenService,
    private _staycation: StaycationService,
    private _basicUtil: BasicUtilService
  ) {}

  ngOnInit(): void {
    this._tokenClaims = <ITokenClaims>this._token.decodedToken()
    this.regPropForm = this._formBuilder.group<RegisterProprietorshipForm>({
      step2: this._formBuilder.group<Step2Form>({
        placeType: new FormControl('', [Validators.required]),
        maxBookingAllowedPerDay: new FormControl(1)
      }),
      step1: this._formBuilder.group<Step1Form>({
        descriptionFilter: new FormControl('', [Validators.required])
      }),
      step3: this._formBuilder.group<Step3Form>({
        unit: new FormControl(''),
        street: new FormControl(''),
        brgy: new FormControl('', [Validators.required]),
        city: new FormControl('', [Validators.required]),
        province: new FormControl('', [Validators.required]),
        zip: new FormControl('', [Validators.required]),
        landmark: new FormControl('')
      }),
      step4: this._formBuilder.group<Step4Form>({
        guests: new FormControl('', [Validators.required]),
        bedrooms: new FormControl(''),
        beds: new FormControl(''),
        bathroom: new FormControl('')
      }),
      step5: this._formBuilder.group<Step5Form>({
        amenities: new FormArray<FormGroup>([], [Validators.required]),
        // amenitiesOther: new FormControl('')
      }),
      step6: this._formBuilder.group<Step6Form>({
        // img: new FormControl(''),
        genImg: new FormControl(''),
        bedroom: new FormControl(''),
        // desc: new FormControl('')
      }),
      step7: this._formBuilder.group<Step7Form>({
         name: new FormControl('', [Validators.required])
      }),
      step8: this._formBuilder.group<Step8Form>({
        descriptionText: new FormArray<FormGroup>([], [Validators.required]),
        // descriptionTextOther: new FormControl(''),
        detailedDescription: new FormControl('', [Validators.required])
      }),
      step9: this._formBuilder.group<Step9Form>({
        // discounts: new FormArray<FormGroup>([])
        discounts: new FormControl('', [Validators.required]),
        value: new FormControl('')
      }),
      step10: this._formBuilder.group<Step10Form>({
        security: new FormArray<FormGroup>([])
      }),
      step11: this._formBuilder.group<Step11Form>({
        price: new FormControl('', [Validators.required])
      }),
      step12: this._formBuilder.group<Step12Form>({
        cancellationPolicy: new FormControl('', [Validators.required]),
        nonRefundable: new FormControl('no')
      }),
      step13: this._formBuilder.group<Step13Form>({
        houseRules: new FormArray<FormGroup>([], [Validators.required]),
        houseRulesDetailed: new FormControl('')
      }),
      step14: this._formBuilder.group<Step14Form>({
        bookingProcess: new FormControl('', [Validators.required])
      })
    })
  }

  ngAfterViewInit(): void {
    this._activatedRoute.data.subscribe({
      next: (res: any) => {
        this.isAuth = res.isAuth
      }
    })
    this._changeDetector.detectChanges()
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }

  public handleNextStep() {
    this._basicUtil.setPlaceType(<string>this.regPropForm.get('step2')?.get('placeType')?.value)
  }


  public scrollToRegProp(): void {
    this.getStarted.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }

  public handleSetCover(e: number) {
    // this._cover = this.regPropForm.controls['step6'].get('img')?.value[e]
  }

  public backToGetstarted() {
    this.isHiddenintro = false;
    this.isHiddenstepper = true;

  }

  public goExit(): void {
    this.location.back();
  }

  public toggleGetStarted() {
    this.isHiddenintro = !this.isHiddenintro;
  }


  public handleRegProp(fg: FormGroup<RegisterProprietorshipForm>, stepper: MatStepper) {
    this.showProgress = true
    let data = fg.getRawValue()
    let fd: FormData = new FormData()
    // server config
    fd.append('host', this._tokenClaims.sub)
    fd.append('serverDirName', data.step7.name.toLowerCase().replace(/\s/g, '_'))
    // step1
    fd.append('descriptionFilter', data.step1.descriptionFilter)
    // step2
    fd.append('placeType', <string>data.step2.placeType)
    fd.append('maxBooking', data.step2.maxBookingAllowedPerDay)
    // step3
    fd.append('address', JSON.stringify(data.step3))
    fd.append('location', '') // for gmap coordinates
    fd.append('landmark', data.step3.landmark)
    // step4
    fd.append('details', JSON.stringify(data.step4))
    // step5
    fd.append('amenities', JSON.stringify(data.step5.amenities))
    // step7
    fd.append('name', data.step7.name)
    // step8
    fd.append('descriptionText', JSON.stringify(data.step8.descriptionText))
    fd.append('detailedDescription', data.step8.detailedDescription)
    // step9
    fd.append('discounts', JSON.stringify(data.step9))
    // step10
    fd.append('security', JSON.stringify(data.step10.security))
    // step11
    fd.append('price', data.step11.price)
    // step12
    fd.append('cancellationPolicy', JSON.stringify(data.step12))
    // step13
    fd.append('houseRules', JSON.stringify(data.step13.houseRules))
    fd.append('houseRulesDetailed', data.step13.houseRulesDetailed)
    // step14
    fd.append('bookingProcess', data.step14.bookingProcess)

    // step6
    let genImg = []
    let bedroom = []
    for(let i: number = 0; i < data.step6.genImg.length; i++) {
      genImg.push(this._customFileName(data.step6.genImg[i], i))
    }
    for(let i: number = 0; i < data.step6.bedroom.length; i++) {
      bedroom.push(this._customFileName(data.step6.bedroom[i], i))
    }
    fd.append('genImgList', JSON.stringify(genImg))
    fd.append('bedroomList', JSON.stringify(bedroom))
    for(let i: number = 0; i < data.step6.genImg.length; i++) {
      fd.append('genImg', data.step6.genImg[i], genImg[i])
    }
    for(let i: number = 0; i < data.step6.bedroom.length; i++) {
      fd.append('bedroom', data.step6.bedroom[i], bedroom[i])
    }
    this.sub.add(this._staycation.apply(fd).subscribe({
      next: (e: any) => {
        if(typeof e === 'number') {
          this.uploadProgress = e
        } else {
          if(e !== undefined) {
            this.showProgress = false
            stepper.next()
          }
        }
      }
    }))
  }

  public handleRemoveCover() {
    this._cover = null
  }

  private _customFileName(file: File, j: number): string {
    let origFileName = file.name
    let i = origFileName.lastIndexOf('.')
    let format = origFileName.substring(i, origFileName.length)
    return `${this._tokenClaims.sub}-${j}${format}`
  }

}
