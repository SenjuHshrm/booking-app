import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { BasicUtilService } from './../../../../../services/basic-util.service';
import { UserService } from './../../../../../services/user.service';
import { FormControl, ValidatorFn, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-admin',
  templateUrl: './create-admin.component.html',
  styleUrls: ['./create-admin.component.scss']
})
export class CreateAdminComponent implements OnInit, OnDestroy {

  public adminForm!: FormGroup;
  public validation: any = {
    firstname: [
      { type: 'required', msg: 'First name required' }
    ],
    lastname: [
      { type: 'required', msg: 'Last name required' }
    ],
    email: [
      { type: 'required', msg: 'Email required' },
      { type: 'email', msg: 'Invalid email format' }
    ],
    password: [
      { type: 'required', msg: 'Password required' },
      { type: 'minlength', msg: 'Password should be eight (8) characters minimum' }
    ],
    authpass: [
      { type: 'required', msg: 'Confirm your password' },
      { type: 'mismatch', msg: 'Passwords didn\'t match' },
      { type: 'minlength', msg: 'Password should be eight (8) characters minimum' }
    ]
  }
  public confirmPassword: ValidatorFn = (ctrl: AbstractControl): ValidationErrors | null => {
    let p = ctrl!.get('password')?.value, c = ctrl!.get('authpass')?.value;
    if(p !== c) {
      ctrl!.get('authpass')?.setErrors({ mismatch: true })
    }
    return (p === c) ? null : { mismatch: true }
  }

  private _sub: Subscription = new Subscription()

  constructor(
    public dialogCreateProfileModal: MatDialogRef<CreateAdminComponent>,
    private _fb: FormBuilder,
    private _user: UserService,
    private _basicUtl: BasicUtilService
  ) { }

  ngOnInit(): void {
    this.adminForm = this._fb.group({
      img: new FormControl(''),
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators. required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      authpass: new FormControl('', [Validators.required, Validators.minLength(8)])
    }, { validators: this.confirmPassword })
  }

  ngOnDestroy(): void {
    this._sub.unsubscribe()
  }

  dialog: any;
  username:any;
  password: string = '';
  confirmpassword: string = '';
  showPassword: boolean = false;
  showConPassword: boolean = false;
  
  login(fg: FormGroup): void {
    // Implement login logic here
    let data = fg.value
    let fd: FormData = new FormData()
    fd.append('fName', data.firstname)
    fd.append('lName', data.lastname)
    fd.append('email', data.email)
    fd.append('password', data.password),
    fd.append('img', data.img, this._basicUtl.profileImgFilename(data.img))
    this._sub.add(this._user.addAdminAcct(fd).subscribe({
      next: (res: { success: boolean }) => {
        this.dialogCreateProfileModal.close();
      },
      error: ({ error }: HttpErrorResponse) => {
        console.log(error)
      }
    }))
  }
  
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
  toggleConfirmPasswordVisibility(): void {
    this.showConPassword = !this.showConPassword;
  }
  

  closeDialogCreateProfile(): void {
    this.dialogCreateProfileModal.close();
  }


  imageUrl: string | ArrayBuffer | null = null;
  fileToUpload: File | null = null;

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.fileToUpload = file;
    this.adminForm.controls['img'].setValue(file)
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
}
