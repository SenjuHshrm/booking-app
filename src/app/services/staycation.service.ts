import { catchError } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StaycationService {
  constructor(private _http: HttpClient) {}

  public apply(fd: FormData, _csrf: string): Observable<any> {
    return this._http
      .post(`${environment.api}/api/staycation/post/apply`, fd, {
        reportProgress: true,
        observe: 'events',
        withCredentials: true,
        headers: {
          'X-XSRF-TOKEN': _csrf
        }
      })
      .pipe(
        map((e: HttpEvent<any>) => {
          if (e !== undefined) {
            if (e.type === HttpEventType.UploadProgress) {
              return Math.round((e.loaded / <number>e.total) * 100);
            } else if (e.type === HttpEventType.Response) {
              return e.body;
            }
          }
        }),
        catchError((e) => {
          return e;
        })
      );
  }

  public getHostListing(
    userId: string,
    page: number,
    limit: number
  ): Observable<any> {
    return this._http.get(
      `${environment.api}/api/staycation/get/host-list/${userId}/${page}/${limit}`
    );
  }

  public updateListing(id: string, isListed: boolean, _csrf: string): Observable<any> {
    return this._http.put(
      `${environment.api}/api/staycation/put/update-listing/${id}`,
      { isListed },
      { withCredentials: true, headers: { 'X-XSRF-TOKEN': _csrf } }
    );
  }

  public updateStaycation(id: string, form: any, _csrf: string): Observable<any> {
    return this._http.put(
      `${environment.api}/api/staycation/put/update-from-admin/${id}`,
      form,
      { withCredentials: true, headers: { 'X-XSRF-TOKEN': _csrf } }
    );
  }

  public getOfficialList(
    page: number,
    limit: number,
    query: string
  ): Observable<any> {
    return this._http.get(
      `${environment.api}/api/staycation/get/list/${page}/${limit}?${query}`
    );
  }

  public getStaycationDetails(id: string): Observable<any> {
    return this._http.get(
      `${environment.api}/api/staycation/get/details/${id}`
    );
  }

  public getStaycationGallery(id: string): Observable<any> {
    return this._http.get(
      `${environment.api}/api/staycation/get/gallery/${id}`
    );
  }

  public getRecentSearches(id: string): Observable<any> {
    return this._http.get(
      `${environment.api}/api/staycation/get/recent-search/${id}`
    );
  }

  public getAllStaycations(
    page: number,
    limit: number,
    name?: string
  ): Observable<any> {
    let url: string =
      name !== undefined
        ? `${environment.api}/api/staycation/get/all/${page}/${limit}?name=${name}`
        : `${environment.api}/api/staycation/get/all/${page}/${limit}`;
    return this._http.get(url);
  }

  public reviewStaycation(id: string, formData: FormData, _csrf: string): Observable<any> {
    return this._http.post(
      `${environment.api}/api/staycation/post/review-staycation/${id}`,
      formData,
      { withCredentials: true, headers: { 'X-XSRF-TOKEN': _csrf } }
    );
  }

  public didCheckOut(id: string): Observable<any> {
    return this._http.get(
      `${environment.api}/api/staycation/get/did-checkout/${id}`
    );
  }

  public getReviewList(
    id: string,
    limit: number,
    page: number
  ): Observable<any> {
    return this._http.get(
      `${environment.api}/api/staycation/get/reviews/${id}/${page}/${limit}`
    );
  }
}
