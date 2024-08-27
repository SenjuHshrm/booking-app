import { PaymentService } from './../../../../services/payment.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-payment-method',
  templateUrl: './create-payment-method.component.html',
  styleUrls: ['./create-payment-method.component.scss']
})
export class CreatePaymentMethodComponent implements OnInit, OnDestroy {

  paymentForm: FormGroup = new FormGroup({}); // Initialize with an empty FormGroup
  bankList: string[] = ['Bank A', 'Bank B', 'Bank C']; // Example bank list
 paymentMethodName: any = [
  {id:0,payMethod:'Credit and Debit Card'},
  {id:1,payMethod:'Gcash'},
  {id:2,payMethod:'Maya'},
 ]
 defaultPaymentMethod: any = 'Credit and Debit Card'; 

  public piTypes: any = [
    { val: "gcash", txt: "GCash" },
  ]
  
  

  private _sub: Subscription = new Subscription()

  constructor(
    private _md: MatDialogRef<CreatePaymentMethodComponent>,
    @Inject(MAT_DIALOG_DATA) private id: string,
    private _payment: PaymentService,
    private fb: FormBuilder
    
  ) { 

 
  }

  ngOnInit(): void {
    this._getMerchantPaymentMethods();
    
    if (this.paymentMethodName && this.paymentMethodName.length > 0) {
      this.defaultPaymentMethod = 0; 
  }
    this.paymentForm = this.fb.group({
      paymentMethod: [this.defaultPaymentMethod, Validators.required], 
      paymentBank: ['', Validators.required],
      cardNumber: ['', [Validators.required, Validators.minLength(16), Validators.maxLength(16)]],
      expirationDate: ['', Validators.required],
      ccv: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(4)]]
    });
  
  }

  ngOnDestroy(): void {
    this._sub.unsubscribe()
  }

  public close() {
    this._md.close()
  }

  private _getMerchantPaymentMethods() {
    this._sub.add(this._payment.getMerchantPaymentMethods().subscribe({
      next: (res: any) => {
        if(res.length > 0) {
          this.piTypes = res
        }
      }
    }))
  }


  setPayMethod(selectElement: HTMLSelectElement) {
    const selectedIndex = selectElement.value;
    this.defaultPaymentMethod = this.paymentMethodName[selectedIndex].id;

  }

  public onSubmit(): void {
    if (this.paymentForm.valid) {
      console.log(this.paymentForm.value);
    }
  }

}
