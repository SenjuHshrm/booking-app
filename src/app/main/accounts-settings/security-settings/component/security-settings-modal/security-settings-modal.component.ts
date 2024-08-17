import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { TokenService } from './../../../../../services/token.service';
import { AuthService } from './../../../../../services/auth.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ITokenClaims } from './../../../../../interfaces/token';
import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-security-settings-modal',
  templateUrl: './security-settings-modal.component.html',
  styleUrls: ['./security-settings-modal.component.scss']
})
export class SecuritySettingsModalComponent implements OnInit, OnDestroy {

  public pwForm!: FormGroup;
  public validation: any = {
    currentPassword: [
      { type: 'required', msg: 'Type your current password' }
    ],
    newPassword: [
      { type: 'required', msg: 'Type your new password' }
    ],
    confirmPassword: [
      { type: 'required', msg: 'Confirm your new password' },
      { type: 'equal', msg: 'Password did\'t match your new password' }
    ]
  }

  private _t!: ITokenClaims
  private _sub: Subscription = new Subscription()

  constructor(
    private _fb: FormBuilder,
    private _d: MatDialogRef<SecuritySettingsModalComponent>,
    @Inject(MAT_DIALOG_DATA) private id: string,
    private _sb: MatSnackBar,
    private _auth: AuthService,
    private _token: TokenService,
    public dialogLogin: MatDialogRef<SecuritySettingsModalComponent>,
  ) { }

  ngOnInit(): void {
    this._t = <ITokenClaims>this._token.decodedToken()
    this.pwForm = this._fb.group({
      currentPassword: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required])
    }, {
      validators: (ctrl: AbstractControl): ValidationErrors | null => {
        let p = ctrl!.get('newPassword')?.value,
            c = ctrl!.get('confirmPassword')?.value
        if(p !== c) ctrl!.get('confirmPassword')?.setErrors({ equal: true })
        return (p === c) ? null : { equal: true }
      }
    })
  }

  ngOnDestroy(): void {
    this._sub.unsubscribe()
  }


  closeDialog(): void {
    this.dialogLogin.close();
  }

  public handleSubmit(fg: FormGroup) {
    this._sub.add(this._auth.updatePassword(this.id, fg.value.newPassword).subscribe({
      next: (res: { success: boolean }) => {
        this._showSnackbar('Password updated successfully')
        this._d.close()
      },
      error: ({ error }: HttpErrorResponse) => {
        console.log(error)
      }
    }))
  }

  private _showSnackbar(msg: string) {
    this._sb.open(msg, 'OK', {
      duration: 1500
    })
  }

}
