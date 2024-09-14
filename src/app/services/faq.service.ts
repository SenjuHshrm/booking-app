import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IFAQ } from '../interfaces/faq';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FaqService {
  constructor(private _http: HttpClient) {}

  public createFaq(data: IFAQ, _csrf: string): Observable<any> {
    return this._http.post(`${environment.api}/api/faqs/post/add`, data, { withCredentials: true, headers: { 'X-XSRF-TOKEN': _csrf } });
  }

  public updateFaq(data: IFAQ, id: string, _csrf: string): Observable<any> {
    return this._http.put(`${environment.api}/api/faqs/put/update/${id}`, data, { withCredentials: true, headers: { 'X-XSRF-TOKEN': _csrf } });
  }

  public getFAQs(page: number, limit: number): Observable<any> {
    return this._http.get(
      `${environment.api}/api/faqs/get/list/${page}/${limit}`
    );
  }

  public deleteFaq(id: string, _csrf: string): Observable<any> {
    return this._http.delete(`${environment.api}/api/faqs/delete/remove/${id}`, { withCredentials: true, headers: { 'X-XSRF-TOKEN': _csrf } });
  }

  public getActiveFaq(): Observable<any> {
    return this._http.get(`${environment.api}/api/faqs/get/list/active`);
  }
}
