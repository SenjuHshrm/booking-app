import { Component, Inject,OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { interval, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-verification-code',
  templateUrl: './verification-code.component.html',
  styleUrls: ['./verification-code.component.scss']
})
export class VerificationCodeComponent implements OnInit {

  securityCodeForm: FormGroup;
  phoneNumber:any;
  canResend: boolean = false;
  resendTimer: number = 30;
  private timerSubscription: Subscription = new Subscription();


  constructor(
    public dialogRef: MatDialogRef<VerificationCodeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {

    this.phoneNumber = data;
    this.securityCodeForm = this.fb.group({
      code1: [''],
      code2: [''],
      code3: [''],
      code4: ['']
    });
  }


  ngOnInit(): void {
    this.startResendTimer();
  }


  startResendTimer(): void {
    this.canResend = false;
    this.timerSubscription = interval(1000).pipe(
      take(this.resendTimer)
    ).subscribe(
      (val) => this.resendTimer -= 1,
      null,
      () => this.canResend = true
    );
  }

  resendCode(): void {
    if (this.canResend) {
      this.resendTimer = 30;  // Reset the timer to 30 seconds
      this.startResendTimer();
      // Trigger the resend code logic here
      console.log('Code resent to ', this.phoneNumber);
    }
  }

  onConfirm(): void {
    const code = `${this.securityCodeForm.value.code1}${this.securityCodeForm.value.code2}${this.securityCodeForm.value.code3}${this.securityCodeForm.value.code4}`;
    this.dialogRef.close(code);
  }

  onCancel(): void {
    this.dialogRef.close();
  }


  ngOnDestroy(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

 
}
