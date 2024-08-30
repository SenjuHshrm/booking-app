import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CarouselService {
  constructor(private _http: HttpClient) {}

  public createCarouselImage(type: string, data: FormData): Observable<any> {
    return this._http.post(
      `${environment.api}/api/img-carousel/post/add/${type}`,
      data
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

  public updateCarouselImage(
    type: string,
    id: string,
    data: FormData
  ): Observable<any> {
    return this._http.put(
      `${environment.api}/api/img-carousel/put/update/${type}/${id}`,
      data
    );
  }

  public deleteCarouselImage(type: string, id: string): Observable<any> {
    return this._http.delete(
      `${environment.api}/api/img-carousel/delete/${type}/${id}`
    );
  }
}
