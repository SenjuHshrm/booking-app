import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class GlobalStaticService {

  constructor(
    private _http: HttpClient
  ) { }

  public getStaticByType(type: string): Observable<{ data: any }> {
    return this._http.get<{ data: any }>(`${environment.api}/api/global-statics/get/statics/type/${type}`)
  }

  public addStatic(data: any, _csrf: string): Observable<any> {
    return this._http.post(`${environment.api}/api/global-statics/post/add-static`, data,{ withCredentials: true, headers: { 'X-XSRF-TOKEN': _csrf } })
  }

  public deleteValueFromStatic(data: any, type: string, _csrf: string): Observable<any> {
    return this._http.delete(`${environment.api}/api/global-statics/delete/static/${type}`, { body: data, headers: { 'X-XSRF-TOKEN': _csrf }, withCredentials: true })
  }
}
