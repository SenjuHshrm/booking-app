import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private _http: HttpClient
  ) { }

  public register(data: { fName: string, lName: string, email: string }): Observable<null> {
    return this._http.post<null>(`${environment.api}/api/user/post/add`, data)
  }

  public getUsersByAccess(access: string, page: number, limit: number): Observable<any> {
    return this._http.get(`${environment.api}/api/user/get/users/${access}/${page}/${limit}`)
  }

  public getProprietorApplications(page: number, limit: number): Observable<any> {
    return this._http.get(`${environment.api}/api/user/get/proprietor-application/${page}/${limit}`)
  }

  public setAsHost(userId: string, staycationId: string, propAppId: string): Observable<{ success: boolean }> {
    return this._http.put<{ success: boolean }>(`${environment.api}/api/user/put/set-as-host/${propAppId}`, { userId, staycationId })
  }

  public addAdminAcct(fd: FormData): Observable<{ success: boolean }> {
    return this._http.post<{ success: boolean }>(`${environment.api}/api/user/post/add/admin`, fd)
  }

  public getUserProfile(id: string): Observable<any> {
    return this._http.get(`${environment.api}/api/user/get/profile/${id}`)
  }

  public updateUserProfile(fd: FormData, id: string): Observable<any> {
    return this._http.put(`${environment.api}/api/user/put/update-profile/${id}`, fd)
  }

  public getUserWishlist(id: string): Observable<any> {
    return this._http.get(`${environment.api}/api/user/get/wishlist/${id}`)
  }

  public getUserProfileImg(id: string): Observable<any> {
    return this._http.get(`${environment.api}/api/user/get/profile-img/${id}`)
  }
}
