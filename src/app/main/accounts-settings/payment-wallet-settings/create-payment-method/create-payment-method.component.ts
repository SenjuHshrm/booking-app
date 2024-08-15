import { PaymentService } from './../../../../services/payment.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy, Inject } from '@angular/core';

@Component({
  selector: 'app-create-payment-method',
  templateUrl: './create-payment-method.component.html',
  styleUrls: ['./create-payment-method.component.scss']
})
export class CreatePaymentMethodComponent implements OnInit, OnDestroy {

  public piTypes: any = [
    { val: "gcash", txt: "GCash" },
    
  ]

  private _sub: Subscription = new Subscription()

  constructor(
    private _md: MatDialogRef<CreatePaymentMethodComponent>,
    @Inject(MAT_DIALOG_DATA) private id: string,
    private _payment: PaymentService
  ) { }

  ngOnInit(): void {
    this._getMerchantPaymentMethods()
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
}
