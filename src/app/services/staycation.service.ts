import { catchError } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StaycationService {

  constructor(
    private _http: HttpClient
  ) { }

  public apply(fd: FormData): Observable<any> {
    return this._http.post(`${environment.api}/api/staycation/post/apply`, fd, {
      reportProgress: true,
      observe: 'events'
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
      catchError((e) => {
        return e
      })
    )
  }

  public getHostListing(userId: string, page: number, limit: number): Observable<any> {
    return this._http.get(`${environment.api}/api/staycation/get/host-list/${userId}/${page}/${limit}`)
  }

  public updateListing(id: string, isListed: boolean): Observable<any> {
    return this._http.put(`${environment.api}/api/staycation/put/update-listing/${id}`, { isListed })
  }

  public updateStaycation(id: string, form: any): Observable<any> {
    return this._http.put(`${environment.api}/api/staycation/put/update-from-admin/${id}`, form)
  }

  public getOfficialList(page: number, limit: number, query: string): Observable<any> {
    return this._http.get(`${environment.api}/api/staycation/get/list/${page}/${limit}?${query}`)
  }

  public getStaycationDetails(id: string): Observable<any> {
    return this._http.get(`${environment.api}/api/staycation/get/details/${id}`)
  }

  public getStaycationGallery(id: string): Observable<any> {
    return this._http.get(`${environment.api}/api/staycation/get/gallery/${id}`)
  }

  public getRecentSearches(id: string): Observable<any> {
    return this._http.get(`${environment.api}/api/staycation/get/recent-search/${id}`)
  }
}
