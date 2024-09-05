import { HttpErrorResponse } from '@angular/common/http';
import { TokenService } from './../../../../services/token.service';
import { ITokenClaims } from './../../../../interfaces/token';
import { BasicUtilService } from './../../../../services/basic-util.service';
import { UserService } from './../../../../services/user.service';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy, Inject, inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormErrorMessage } from 'src/app/interfaces/input-error-message';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-profile-modal',
  templateUrl: './create-profile-modal.component.html',
  styleUrls: ['./create-profile-modal.component.scss'],
})
export class CreateProfileModalComponent implements OnInit, OnDestroy {
  public userProfileForm!: FormGroup;
  public validation: any = {
    fName: [{ type: 'required', msg: 'Enter your first name' }],
    lName: [{ type: 'required', msg: 'Enter your last name' }],
    contact: [{ type: 'required', msg: 'Enter your contact number' }],
  };

  private _claims!: ITokenClaims;
  private _sub: Subscription = new Subscription();
  private _snack: MatSnackBar = inject(MatSnackBar);

  fNameErrors: FormErrorMessage[] = [
    {
      field: 'fName',
      error: 'required',
      message: 'Firstname is required.',
    },
  ];
  lNameErrors: FormErrorMessage[] = [
    {
      field: 'lName',
      error: 'required',
      message: 'Lastname is required.',
    },
  ];
  contactErrors: FormErrorMessage[] = [
    {
      field: 'contact',
      error: 'required',
      message: 'Contact is required.',
    },
  ];

  unitErrors: FormErrorMessage[] = [
    {
      field: 'unit',
      error: 'required',
      message: 'Unit is required.',
    },
  ];
  streetErrors: FormErrorMessage[] = [
    {
      field: 'street',
      error: 'required',
      message: 'Street is required.',
    },
  ];
  brgyErrors: FormErrorMessage[] = [
    {
      field: 'brgy',
      error: 'required',
      message: 'Barangay is required.',
    },
  ];
  cityErrors: FormErrorMessage[] = [
    {
      field: 'city',
      error: 'required',
      message: 'City is required.',
    },
  ];
  provinceErrors: FormErrorMessage[] = [
    {
      field: 'province',
      error: 'required',
      message: 'Province is required.',
    },
  ];
  countryErrors: FormErrorMessage[] = [
    {
      field: 'country',
      error: 'required',
      message: 'Country is required.',
    },
  ];
  zipErrors: FormErrorMessage[] = [
    {
      field: 'zip',
      error: 'required',
      message: 'Zip Code is required.',
    },
  ];

  constructor(
    public dialogCreateProfileModal: MatDialogRef<CreateProfileModalComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private _fb: FormBuilder,
    private _user: UserService,
    private _basicUtil: BasicUtilService,
    private _token: TokenService
  ) {}

  ngOnInit(): void {
    this._claims = <ITokenClaims>this._token.decodedToken();
    this.userProfileForm = this._fb.group({
      desc: new FormControl(this.data.desc ? this.data.desc.description : ''),
      fName: new FormControl(this.data.name.fName, [Validators.required]),
      mName: new FormControl(this.data.name.mName),
      lName: new FormControl(this.data.name.lName, [Validators.required]),
      xName: new FormControl(this.data.name.xName),
      unit: new FormControl(this.data?.address?.unit || '', [
        Validators.required,
      ]),
      street: new FormControl(this.data?.address?.street || '', [
        Validators.required,
      ]),
      brgy: new FormControl(this.data?.address?.brgy || '', [
        Validators.required,
      ]),
      city: new FormControl(this.data?.address?.city || '', [
        Validators.required,
      ]),
      province: new FormControl(this.data?.address?.province || '', [
        Validators.required,
      ]),
      country: new FormControl(this.data?.address?.country || '', [
        Validators.required,
      ]),
      zip: new FormControl(this.data?.address?.zip || '', [
        Validators.required,
      ]),
      contact: new FormControl(this.data.contact, [Validators.required]),
      hobbies: new FormControl(
        this.data.desc ? this.data.desc.hobbies.join(',') : ''
      ),
      work: new FormControl(this.data.desc ? this.data.desc.work : ''),
      favFood: new FormControl(this.data.desc ? this.data.desc.favFood : ''),
      favPlace: new FormControl(this.data.desc ? this.data.desc.favPlace : ''),
      img: new FormControl(''),
    });
    this.imageUrl = this.data.img;
  }

  ngOnDestroy(): void {
    this._sub.unsubscribe();
  }

  closeDialogCreateProfile(): void {
    this.dialogCreateProfileModal.close();
  }

  imageUrl: string | ArrayBuffer | null = null;
  fileToUpload: File | null = null;

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.fileToUpload = file;
    this.userProfileForm.get('img')?.setValue(file);
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imageUrl = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  uploadImage() {
    if (this.fileToUpload) {
      console.log('Image uploaded:', this.fileToUpload);
    } else {
      console.error('No image selected.');
    }
  }

  public updateProfile(fg: FormGroup) {
    if (fg.invalid) {
      this.userProfileForm.markAllAsTouched();
      return;
    }

    let data = fg.value;

    const address = {
      unit: data.unit,
      street: data.street,
      brgy: data.brgy,
      city: data.city,
      province: data.province,
      country: data.country,
      zip: data.zip,
    };

    let fd: FormData = new FormData();
    fd.append('email', this.data.email);
    fd.append('desc', data.desc);
    fd.append('fName', data.fName);
    fd.append('mName', data.mName);
    fd.append('lName', data.lName);
    fd.append('xName', data.xName);
    fd.append('contact', data.contact);
    fd.append('address', JSON.stringify(address));
    fd.append('hobbies', data.hobbies);
    fd.append('work', data.work);
    fd.append('favFood', data.favFood);
    fd.append('favPlace', data.favPlace);
    if (data.img !== '') {
      fd.append('img', data.img, this._basicUtil.profileImgFilename(data.img));
    }
    this._sub.add(
      this._user.updateUserProfile(fd, this._claims.sub).subscribe({
        next: (res: any) => {
          this.closeDialogCreateProfile();
        },
        error: ({ error }: HttpErrorResponse) => {
          this._snack.open(error.code, '', { duration: 1000 });
        },
      })
    );
  }
}
