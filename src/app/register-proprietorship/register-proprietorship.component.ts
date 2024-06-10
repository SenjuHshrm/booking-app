import { StaycationService } from './../services/staycation.service';
import { Subscription } from 'rxjs';
import { ITokenClaims } from './../interfaces/token';
import { TokenService } from './../services/token.service';
import { ActivatedRoute } from '@angular/router';
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
  Step11Form
} from './register-proprietorship';
import { fadeInAnimation } from '../globals/fadein-animations';


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

  private _cover!: File | null;
  private _tokenClaims!: ITokenClaims;
  private sub: Subscription = new Subscription()

  constructor(
    private _formBuilder: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private _changeDetector: ChangeDetectorRef,
    private _token: TokenService,
    private _staycation: StaycationService
  ) {}

  ngOnInit(): void {
    this._tokenClaims = this._token.decodedToken()
    this.regPropForm = this._formBuilder.group<RegisterProprietorshipForm>({
      step1: this._formBuilder.group<Step1Form>({
        descriptionFilter: new FormArray<FormGroup>([], [Validators.required]),
        descriptionFilterOther: new FormControl('')
      }),
      step2: this._formBuilder.group<Step2Form>({
        placeType: ['', Validators.required]
      }),
      step3: this._formBuilder.group<Step3Form>({
        unit: new FormControl(''),
        street: new FormControl(''),
        brgy: new FormControl('', [Validators.required]),
        city: new FormControl('', [Validators.required]),
        province: new FormControl('', [Validators.required]),
        zip: new FormControl('', [Validators.required])
      }),
      step4: this._formBuilder.group<Step4Form>({
        guests: new FormControl(''),
        bedrooms: new FormControl(''),
        beds: new FormControl(''),
        bathroom: new FormControl('')
      }),
      step5: this._formBuilder.group<Step5Form>({
        amenities: new FormArray<FormGroup>([], [Validators.required]),
        amenitiesOther: new FormControl('')
      }),
      step6: this._formBuilder.group<Step6Form>({
        img: new FormControl('')
      }),
      step7: this._formBuilder.group<Step7Form>({
         name: new FormControl('')
      }),
      step8: this._formBuilder.group<Step8Form>({
        descriptionText: new FormArray<FormGroup>([]),
        descriptionTextOther: new FormControl('')
      }),
      step9: this._formBuilder.group<Step9Form>({
        discounts: new FormArray<FormGroup>([])
      }),
      step10: this._formBuilder.group<Step10Form>({
        security: new FormArray<FormGroup>([])
      }),
      step11: this._formBuilder.group<Step11Form>({
        price: new FormControl(''),
        beforeTax: new FormControl({ value: '', disabled: true})
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




  public scrollToRegProp(): void {
    this.getStarted.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }

  public handleSetCover(e: number) {
    this._cover = this.regPropForm.controls['step6'].get('img')?.value[e]
  }

  public handleRegProp(fg: FormGroup<RegisterProprietorshipForm>) {
    console.log(fg.getRawValue())
    let data = fg.getRawValue()
    let fd: FormData = new FormData()
    let imgDesc = []
    fd.append('host', this._tokenClaims.sub)
    fd.append('name', data.step7.name)
    fd.append('serverDirName', (<string>data.step7.name.replace(/\s/, '_')).toLowerCase())
    fd.append('descriptionFilter', JSON.stringify([ ...data.step1.descriptionFilter, ...data.step1.descriptionFilterOther.split(',') ]))
    fd.append('descriptionText', JSON.stringify([ ...data.step8.descriptionText, ...data.step8.descriptionTextOther.split(',') ]))
    fd.append('placeType', <string>data.step2.placeType)
    fd.append('location', '')
    fd.append('address', JSON.stringify(data.step3))
    fd.append('details', JSON.stringify({ guests: data.step4.guests, bedrooms: data.step4.bedrooms, beds: data.step4.beds, bathroom: data.step4.bathroom }))
    fd.append('amenities', JSON.stringify([ ...data.step5.amenities, ...data.step5.amenitiesOther.split(',') ]))
    fd.append('reservationConfirmation', 'direct_msg')
    fd.append('welcomingGuest', 'tarago')
    fd.append('price', JSON.stringify(data.step11))
    fd.append('discounts', JSON.stringify(data.step9.discounts))
    fd.append('security', JSON.stringify(data.step10.security))
    for(let i: number = 0; i < data.step6.img.length; i++) {
      imgDesc.push({
        filename: this._customFileName(data.step6.img[i], i),
        desc: (this._cover!.name === data.step6.img[i].name) ? 'cover' : 'media'
      })
    }
    fd.append('imgDesc', JSON.stringify(imgDesc))
    for(let i: number = 0; i < imgDesc.length; i++) {
      fd.append('img', data.step6.img[i], imgDesc[i].filename)
    }
    this.sub.add(this._staycation.apply(fd).subscribe({
      next: (e: any) => {
        if(typeof e === 'number') {
          console.log(e)
        } else {
          if(e !== undefined) {
            console.log(e)
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
