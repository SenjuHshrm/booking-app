import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(
    private _http: HttpClient
  ) { }

  public getUserPaymentMethod(id: string): Observable<any> {
    return this._http.get(`${environment.api}/api/payment/get/payment-method/${id}`)
  }

  public getMerchantPaymentMethods(): Observable<any> {
    return this._http.get(`${environment.api}/api/payment/get/merchant/payment-methods`)
  }
}
