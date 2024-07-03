import { HttpErrorResponse } from '@angular/common/http';
import { TokenService } from './../../../../services/token.service';
import { ITokenClaims } from './../../../../interfaces/token';
import { BasicUtilService } from './../../../../services/basic-util.service';
import { UserService } from './../../../../services/user.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-create-profile-modal',
  templateUrl: './create-profile-modal.component.html',
  styleUrls: ['./create-profile-modal.component.scss']
})
export class CreateProfileModalComponent implements OnInit, OnDestroy {

  public userProfileForm!: FormGroup;
  public validation: any = {
    fName: [{ type: 'required', msg: 'Enter your first name' }],
    lName: [{ type: 'required', msg: 'Enter your last name' }],
    contact: [{ type: 'required', msg: 'Enter your contact number' }]
  }

  private _claims!: ITokenClaims
  private _sub: Subscription = new Subscription()

  constructor(
    public dialogCreateProfileModal: MatDialogRef<CreateProfileModalComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private _fb: FormBuilder,
    private _user: UserService,
    private _basicUtil: BasicUtilService,
    private _token: TokenService
  ) { }

  ngOnInit(): void {
    this._claims = <ITokenClaims>this._token.decodedToken()
    this.userProfileForm = this._fb.group({
      desc: new FormControl((this.data.desc) ? this.data.desc.description : ''),
      fName: new FormControl(this.data.name.fName, [Validators.required]),
      mName: new FormControl(this.data.name.mName),
      lName: new FormControl(this.data.name.lName, [Validators.required]),
      xName: new FormControl(this.data.name.xName),
      contact: new FormControl(this.data.contact, [Validators.required]),
      hobbies: new FormControl((this.data.desc) ? this.data.desc.hobbies.join(',') : ''),
      work: new FormControl((this.data.desc) ? this.data.desc.work : ''),
      favFood: new FormControl((this.data.desc) ? this.data.desc.favFood : ''),
      favPlace: new FormControl((this.data.desc) ? this.data.desc.favPlace : ''),
      img: new FormControl('')
    })
    this.imageUrl = this.data.img
  }

  ngOnDestroy(): void {
    this._sub.unsubscribe()
  }

  closeDialogCreateProfile(): void {
    this.dialogCreateProfileModal.close();
  }
  
  imageUrl: string | ArrayBuffer | null = null;
  fileToUpload: File | null = null;

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.fileToUpload = file;
    this.userProfileForm.get('img')?.setValue(file)
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
    let data = fg.value
    let fd: FormData = new FormData()
    fd.append('email', this.data.email)
    fd.append('desc', data.desc)
    fd.append('fName', data.fName)
    fd.append('mName', data.mName)
    fd.append('lName', data.lName)
    fd.append('xName', data.xName)
    fd.append('contact', data.contact)
    fd.append('hobbies', data.hobbies)
    fd.append('work', data.work)
    fd.append('favFood', data.favFood)
    fd.append('favPlace', data.favPlace)
    if(data.img !== '') {
      fd.append('img', data.img, this._basicUtil.profileImgFilename(data.img))
    }
    this._sub.add(this._user.updateUserProfile(fd, this._claims.sub).subscribe({
      next: (res: any) => {
        this.closeDialogCreateProfile()
      },
      error: ({ error }: HttpErrorResponse) => {
        console.log(error)
      }
    }))
  }


}
