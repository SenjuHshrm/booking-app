import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  constructor(private _http: HttpClient) {}

  public tempBooking(data: any, _csrf: string): Observable<any> {
    return this._http.post(
      `${environment.api}/api/booking/post/temp-add-booking`,
      data,
      { withCredentials: true, headers: { 'X-XSRF-TOKEN': _csrf } }
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

  public updateBookingStatus(
    id: string,
    status: string,
    _csrf: string
  ): Observable<any> {
    return this._http.post(
      `${environment.api}/api/booking/post/update-booking-status/${id}`,
      { status },
      { withCredentials: true, headers: { 'X-XSRF-TOKEN': _csrf } }
    );
  }

  public getBookingGuests(id: string): Observable<any> {
    return this._http.get(
      `${environment.api}/api/booking/get/guest-list/${id}`
    );
  }

  public addGuest(id: string, data: any, _csrf: string): Observable<any> {
    return this._http.post(
      `${environment.api}/api/booking/post/add-guest/${id}`,
      data,
      { withCredentials: true, headers: { 'X-XSRF-TOKEN': _csrf } }
    );
  }

  public checkOutGuest(id: string, data: any, _csrf: string): Observable<any> {
    return this._http.post(
      `${environment.api}/api/booking/post/checkout-guest/${id}`,
      data,
      { withCredentials: true, headers: { 'X-XSRF-TOKEN': _csrf } }
    );
  }

  public getBookingsByGuestId(
    limit: number,
    page: number,
    type: string,
    search: string
  ): Observable<any> {
    let params: { search?: string; limit: number; page: number; type: string } =
      {
        limit,
        page,
        type,
      };
    if (search !== '') {
      params.search = search;
    }
    return this._http.get(`${environment.api}/api/booking/get/trips`, {
      params: { ...params },
    });
  }

  public cancelBooking(data: any, _csrf: string): Observable<any> {
    return this._http.post(
      `${environment.api}/api/booking/post/cancel-booking`,
      data,
      { withCredentials: true, headers: { 'X-XSRF-TOKEN': _csrf } }
    );
  }

  public bookingCheckIn(id: string, _csrf: string): Observable<any> {
    return this._http.post(
      `${environment.api}/api/booking/post/check-in/${id}`,
      {},
      { withCredentials: true, headers: { 'X-XSRF-TOKEN': _csrf } }
    );
  }

  public bookingCheckOut(id: string, _csrf: string): Observable<any> {
    return this._http.post(
      `${environment.api}/api/booking/post/check-out/${id}`,
      {},
      { withCredentials: true, headers: { 'X-XSRF-TOKEN': _csrf } }
    );
  }

  public getCancelledBookings(
    id: string,
    page: number,
    limit: number,
    search?: string
  ): Observable<any> {
    let searchKey: { search?: string } = {};
    if (search !== '') {
      searchKey.search = search;
    }
    return this._http.get(
      `${environment.api}/api/booking/get/cancelled/${id}/${page}/${limit}`,
      { params: { ...searchKey } }
    );
  }

  public approveCancellation(
    bookingId: string,
    cancelId: string,
    _csrf: string
  ): Observable<any> {
    return this._http.post(
      `${environment.api}/api/booking/post/approve-cancel/${bookingId}/${cancelId}`,
      {},
      { withCredentials: true, headers: { 'X-XSRF-TOKEN': _csrf } }
    );
  }

  public denyCancellation(
    bookingId: string,
    cancelId: string,
    _csrf: string
  ): Observable<any> {
    return this._http.post(
      `${environment.api}/api/booking/post/deny-cancel/${bookingId}/${cancelId}`,
      {},
      { withCredentials: true, headers: { 'X-XSRF-TOKEN': _csrf } }
    );
  }
}
