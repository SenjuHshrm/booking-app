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

  public createPaymentIntent(data: any, _csrf: string): Observable<any> {
    return this._http.post(`${environment.api}/api/payment/post/create-payment-intent`, data, { withCredentials: true, headers: { 'X-XSRF-TOKEN': _csrf } })
  }

  public createPaymentMethod(data: any): Observable<any> {
    // return this._http.request(`${environment.paymongoURL}/payment_methods`, data, {
    //   context: new HttpContext().set(BYPASS_LOG, true),
    //   headers: {
    //     accept: 'application/json',
    //     'content-type': 'application/json',
    //     authorization: `Basic ${btoa(environment.paymongoPK + ":")}`
    //   }
    // })
    return this._http.request('post', `${environment.paymongoURL}/payment_methods`, {
      context: new HttpContext().set(BYPASS_LOG, true),
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: `Basic ${btoa(environment.paymongoPK + ":")}`
      },
      body: data
    })
  }

  public removePaymentMethod(id: string, _csrf: string): Observable<any> {
    return this._http.delete(`${environment.api}/api/payment/delete/${id}`,{ withCredentials: true, headers: { 'X-XSRF-TOKEN': _csrf } })
  }

  public savePaymentMethodId(data: { userId: string, pmId: string }, _csrf: string): Observable<any> {
    return this._http.post(`${environment.api}/api/payment/post/save-pm-id`, data, { withCredentials: true, headers: { 'X-XSRF-TOKEN': _csrf } })
  }

  public getPaymentMethod(pmId: string): Observable<any> {
    return this._http.get(`${environment.paymongoURL}/payment_methods/${pmId}`, {
      context: new HttpContext().set(BYPASS_LOG, true),
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: `Basic ${btoa(environment.paymongoPK + ":")}`
      }
    })
  }

  public setAsDefaultPaymentMethod(userId: string, pmId: string, _csrf: string): Observable<any> {
    return this._http.put(`${environment.api}/api/payment/put/set-as-default/${userId}/${pmId}`, {}, { withCredentials: true, headers: { 'X-XSRF-TOKEN': _csrf } })
  }

  public attachToPaymentIntent(data: any, piId: string, _csrf: string): Observable<any> {
    return this._http.post(`${environment.api}/api/payment/post/attach-to-payment-intent/${piId}`, data, { withCredentials: true, headers: { 'X-XSRF-TOKEN': _csrf } })
  }
}
