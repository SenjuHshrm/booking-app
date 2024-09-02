import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(
    private _http: HttpClient
  ) { }

  public tempBooking(data: any): Observable<any> {
    return this._http.post(`${environment.api}/api/booking/post/temp-add-booking`, data)
  }
}
