import { catchError } from 'rxjs/operators';
import { map, Observable } from 'rxjs';
import { HttpClient, HttpEvent, HttpEventType, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { BYPASS_LOG } from '../interceptors/request.interceptor';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private _http: HttpClient) {}

  public register(data: {
    fName: string;
    lName: string;
    email: string;
  }, _csrf: string): Observable<any> {
    return this._http.post<any>(`${environment.api}/api/user/post/add`, data, { withCredentials: true, headers: { 'X-XSRF-TOKEN': _csrf } });
  }

  public getUsersByAccess(
    access: string,
    page: number,
    limit: number
  ): Observable<any> {
    return this._http.get(
      `${environment.api}/api/user/get/users/${access}/${page}/${limit}`
    );
  }

  public getProprietorApplications(
    page: number,
    limit: number
  ): Observable<any> {
    return this._http.get(
      `${environment.api}/api/user/get/proprietor-application/${page}/${limit}`
    );
  }

  public setAsHost(
    userId: string,
    staycationId: string,
    propAppId: string,
    _csrf: string
  ): Observable<{ success: boolean }> {
    return this._http.put<{ success: boolean }>(
      `${environment.api}/api/user/put/set-as-host/${propAppId}`,
      { userId, staycationId },
      { withCredentials: true, headers: { 'X-XSRF-TOKEN': _csrf } }
    );
  }

  public addAdminAcct(fd: FormData, _csrf: string): Observable<{ success: boolean }> {
    return this._http.post<{ success: boolean }>(
      `${environment.api}/api/user/post/add/admin`,
      fd,
      { withCredentials: true, headers: { 'X-XSRF-TOKEN': _csrf } }
    );
  }

  public getUserProfile(id: string): Observable<any> {
    return this._http.get(`${environment.api}/api/user/get/profile/${id}`);
  }

  public updateUserProfile(fd: FormData, id: string, _csrf: string): Observable<any> {
    return this._http.put(
      `${environment.api}/api/user/put/update-profile/${id}`,
      fd,
      { withCredentials: true, headers: { 'X-XSRF-TOKEN': _csrf } }
    );
  }

  public getUserWishlist(id: string): Observable<any> {
    return this._http.get(`${environment.api}/api/user/get/wishlist/${id}`);
  }

  public getUserProfileImg(id: string): Observable<any> {
    return this._http.get(`${environment.api}/api/user/get/profile-img/${id}`);
  }

  public addToWishlist(user: string, staycation: string, _csrf: string): Observable<any> {
    return this._http.post(`${environment.api}/api/user/post/add-to-wishlist`, {
      user,
      staycation,
    }, { withCredentials: true, headers: { 'X-XSRF-TOKEN': _csrf } });
  }

  public removeToWishlist(user: string, staycation: string, _csrf: string): Observable<any> {
    return this._http.delete(
      `${environment.api}/api/user/delete/remove-to-wishlist/${user}/${staycation}`,
      { withCredentials: true, headers: { 'X-XSRF-TOKEN': _csrf } }
    );
  }

  public checkInWishlist(user: string, staycation: string) {
    return this._http.get(
      `${environment.api}/api/user/get/check-in-wishlist/${user}/${staycation}`
    );
  }

  public verificationProfileUpdate(formData: any, id: string, _csrf: string): Observable<any> {
    return this._http.put(
      `${environment.api}/api/user/put/verification/update-profile/${id}`,
      formData,
      { withCredentials: true, headers: { 'X-XSRF-TOKEN': _csrf } }
    );
  }

  public verifyAccountById(formData: FormData, _csrf: string): Observable<any> {
    return this._http.post(
      `${environment.api}/api/user/post/upload-verification`,
      formData,
      { withCredentials: true, headers: { 'X-XSRF-TOKEN': _csrf } }
    );
  }

  public checkVerificationStatus(id: string): Observable<any> {
    return this._http.get(
      `${environment.api}/api/user/get/user-verification-status/${id}`
    );
  }

  public getVerificationList(
    page: number,
    limit: number,
    filter?: string
  ): Observable<any> {
    let searchData: any = {};
    if (filter && filter !== '') searchData.name = filter;
    return this._http.get(
      `${environment.api}/api/user/get/user-identification/${page}/${limit}`,
      { params: { ...searchData } }
    );
  }

  public updateVerificationStatus(
    status: 'approved' | 'rejected',
    id: string,
    _csrf: string
  ): Observable<any> {
    return this._http.put(
      `${environment.api}/api/user/put/update-user-verification/${id}`,
      { status },
      { withCredentials: true, headers: { 'X-XSRF-TOKEN': _csrf } }
    );
  }

  public requestSupportDocs(userId: string, staycationId: string, date: string, _csrf: string): Observable<any> {
    return this._http.post(`${environment.api}/api/user/post/request-docs/${userId}/${staycationId}`, { date }, { withCredentials: true, headers: { 'X-XSRF-TOKEN': _csrf } })
  }

  public uploadSupportDocs(fd: FormData, userId: string, token: string, _csrf: string): Observable<any> {
    return this._http.request('post', `${environment.api}/api/user/post/upload-docs/${userId}`, {
      reportProgress: true,
      observe: 'events',
      context: new HttpContext().set(BYPASS_LOG, true),
      headers: {
        authorization: `Bearer ${token}`,
        'X-XSRF-TOKEN': _csrf
      },
      body: fd,
      withCredentials: true
    }).pipe(
      map((e: HttpEvent<any>) => {
        if(e !== undefined) {
          if(e.type === HttpEventType.UploadProgress) {
            return Math.round(e.loaded / <number>e.total * 100)
          } else if(e.type === HttpEventType.Response) {
            return e.body
          }
        }
      }),
      catchError((e) => { return e })
    )
  }
}
