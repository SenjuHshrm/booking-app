import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { IAuth } from '../interfaces/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private _http: HttpClient
  ) { }

  public login(data: IAuth, _csrf: string): Observable<{ token: string }> {
    return this._http.post<{ token: string }>(`${environment.api}/api/auth/post/login`, data, { withCredentials: true, headers: { 'X-XSRF-TOKEN': _csrf } })
  }

  public googleLogin(data: { authData: any, userData: any }): Observable<{ token: string }> {
    let { authData, userData } = data
    return this._http.post<{ token: string }>(`${environment.api}/api/auth/post/login/google`, { authData, userData })
  }

  public checkUser(): Observable<{ isAuth: boolean } | { code: string }> {
    return this._http.get<{ isAuth: boolean } | { code: string }>(`${environment.api}/api/auth/get/check-user`)
  }

  public requestAccessToken(): Observable<{ token: string } | { code: string }> {
    return this._http.get<{ token: string } | { code: string }>(`${environment.api}/api/auth/get/request-token`)
  }

  public logout(): Observable<{ logout: boolean }> {
    return this._http.delete<{ logout: boolean }>(`${environment.api}/api/auth/delete/logout`)
  }

  public updatePassword(id: string, password: string, _csrf: string): Observable<{ success: boolean }> {
    return this._http.put<{ success: boolean }>(`${environment.api}/api/auth/put/update-password/${id}`, { password }, { withCredentials: true, headers: { 'X-XSRF-TOKEN': _csrf } })
  }

  public csrfToken(): Observable<any> {
    return this._http.get(`${environment.api}/token`, { withCredentials: true })
  }

}
