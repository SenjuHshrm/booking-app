import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CarouselService {
  constructor(private _http: HttpClient) {}

  public createCarouselImage(type: string, data: FormData, _csrf: string): Observable<any> {
    return this._http.post(
      `${environment.api}/api/img-carousel/post/add/${type}`,
      data,
      { withCredentials: true, headers: { 'X-XSRF-TOKEN': _csrf } }
    );
  }

  public getCarouselByType(
    type: string,
    limit: number,
    page: number
  ): Observable<any> {
    return this._http.get(
      `${environment.api}/api/img-carousel/get/list-all/${type}/${page}/${limit}`
    );
  }

  public getActiveCarouselByType(type: string): Observable<any> {
    return this._http.get(
      `${environment.api}/api/img-carousel/get/list-active/${type}`
    );
  }

  public updateCarouselImage(
    type: string,
    id: string,
    data: FormData,
    _csrf: string
  ): Observable<any> {
    return this._http.put(
      `${environment.api}/api/img-carousel/put/update/${type}/${id}`,
      data,
      { withCredentials: true, headers: { 'X-XSRF-TOKEN': _csrf } }
    );
  }

  public deleteCarouselImage(type: string, id: string, _csrf: string): Observable<any> {
    return this._http.delete(
      `${environment.api}/api/img-carousel/delete/${type}/${id}`,
      { withCredentials: true, headers: { 'X-XSRF-TOKEN': _csrf } }
    );
  }
}
