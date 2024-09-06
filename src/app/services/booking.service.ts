import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  constructor(private _http: HttpClient) {}

  public tempBooking(data: any): Observable<any> {
    return this._http.post(
      `${environment.api}/api/booking/post/temp-add-booking`,
      data
    );
  }

  public getBookingByType(
    id: string,
    type: string,
    page: number,
    limit: number,
    search?: string
  ): Observable<any> {
    let searchKey: { search?: string } = {};
    if (search !== '') {
      searchKey.search = search;
    }
    return this._http.get(
      `${environment.api}/api/booking/get/list/${id}/${page}/${limit}/${type}`,
      { params: { ...searchKey } }
    );
  }

  public updateBookingStatus(id: string, status: string): Observable<any> {
    return this._http.post(
      `${environment.api}/api/booking/post/update-booking-status/${id}`,
      { status }
    );
  }
}
