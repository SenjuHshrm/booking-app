import { Observable } from 'rxjs';
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment'
import { BYPASS_LOG } from '../interceptors/request.interceptor';

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

  public createPaymentIntent(data: any): Observable<any> {
    return this._http.post(`${environment.api}/api/payment/post/create-payment-intent`, data)
  }

  public createPaymentMethod(data: any): Observable<any> {
    return this._http.post(`${environment.paymongoURL}/payment_methods`, data, {
      context: new HttpContext().set(BYPASS_LOG, true),
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: `Basic ${btoa(environment.paymongoPK + ":")}`
      }
    })
  }

  public attachToPaymentIntent(data: any, piId: string): Observable<any> {
    return this._http.post(`${environment.api}/api/payment/post/attach-to-payment-intent/${piId}`, data)
  }
}
